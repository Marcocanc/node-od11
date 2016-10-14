'use strict'
const EventEmitter = require('events')
const WebSocket = require('ws')
const assert = require('assert')

const OD11Action = require('./OD11Action')


class OD11 extends EventEmitter {

	constructor(url) {
		super()
		this.url = url
	}
	
	connect() {
		this.ws = new WebSocket('ws://'+this.url+'/ws')
		this.setupListeners()
	}

	setupListeners() {
		this.ws.on('open', () => this.sendAction(OD11Action.init))

		this.ws.on('message', this.parseMessage.bind(this))

		this.ws.on('close', function() {
			setTimeout(this.connect, 5000)
		}.bind(this))

		this.ws.on('error', function() {
        	console.log('socket error:');
    	});
	}

	parseMessage(message) {
		//if string parse json (doing this in order to allow recursive parsing)
		let msg = (typeof message == "string") ? JSON.parse(message) : message

		if (msg.response) {
			switch (msg.response) {
				case "global_joined":
					this.sendAction(OD11Action.joinGroup)
					break
				case "group_joined":
				case "speaker_pong":
					this.schedulePing()
					break
			}
			this.emit(msg.response)
		}
		

		switch (msg.update) {
			//volume
			case "group_volume_changed":
				this.volume = msg.vol
				this.emit(msg.update, msg.vol)
				break
			case "group_max_volume":
				this.maxVolume = msg.value
				break
			//playback
			case "track_changed":
				this.track = msg.track
				this.position = 0
				this.emit(msg.update, msg.track)
				break
			case "playback_state_changed":
				this.playing = msg.playing
				this.emit(msg.update, msg.playing)
				break
			case "realtime":
				this.position = msg.position
				this.emit("position_changed", msg.position)
				break

			//Sound
			case "group_eq_bass_boost":
				this.bassBoost = msg.enabled
				this.emit(msg.update, msg.enabled)
				break
			case "group_eq_treble_boost":
				this.trebleBoost = msg.enabled
				this.emit(msg.update, msg.enabled)
				break

		}

		if (msg.state) {
			msg.state.forEach((state) => this.parseMessage(state))
		}
	}


	sendAction(action) {
		let actionJSON = JSON.stringify(action)
		this.ws.send(actionJSON)
	}

	//val between 0 and 100
	setVolume(absoluteValue) {
		this.sendAction(OD11Action.setVolume(absoluteValue))
	}

	schedulePing() {
		setTimeout( () => this.sendAction(OD11Action.ping) , 5000);
	}
}

module.exports = OD11