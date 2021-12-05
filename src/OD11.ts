import { GlobalAction, GroupAction, OD11Action } from "./OD11Action"
import { EventEmitter } from "events"
import { Speaker } from "./Speaker"
import { Client } from "./Client"
import { Track } from "./Track"
import { Realtime } from "./Realtime"
import { Service } from "./Service"
import * as WebSocket from "ws"

export namespace OD11 {
	export declare interface WSClient {
		on(event: 'realtime', listener: (realtime: Realtime) => void): this;
		on(event: 'playback_state_changed', listener: (playing: boolean) => void): this;
		on(event: "client_joined_group", listener: (client: Client) => void): this;
	}

	export class WSClient extends EventEmitter {
		ws!: WebSocket
		url: string
		volume?: number
		maxVolume?: number
		position?: number
		bassBoost?: boolean
		playing?: boolean
		trebleBoost?: boolean
		track!: any

		clientUid: string = "uid-" + Math.floor(1e8 * Math.random())
	
		constructor(url: string = "ws://OD-11.local/ws") {
			super()
			this.url = url
		}
		
		connect() {
			this.ws = new WebSocket(this.url)
			this.setupListeners()
		}
	
		setupListeners() {
			this.ws.on('open', () => this.sendAction(new GlobalAction.GlobalJoin()))
	
			this.ws.on('message', this.parseMessage.bind(this))
	
			this.ws.on('close', function() {
				setTimeout(this.connect, 5000)
			}.bind(this))
	
			this.ws.on('error', function() {
				console.log('socket error:');
			});
		}
	
		parseMessage(message: any) {
			//if string parse json (doing this in order to allow recursive parsing)
			let msg = (typeof message == "string") ? JSON.parse(message) : message
	
			if (msg.response) {
				switch (msg.response) {
					case "global_joined":
						this.sendAction(new GlobalAction.GroupJoin(this.clientUid))
						break
					case "group_joined":
						msg.state.forEach(this.parseMessage.bind(this));
					case "speaker_pong":
						this.schedulePing()
						break
					case "error":
						console.log("Error: " + msg.error)
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
					this.emit(msg.update)
					break
				//playback
				case "track_changed":
					this.track = msg.track as Track
					this.position = 0
					this.emit(msg.update, msg.track)
					break
				case "playback_state_changed":
					this.playing = msg.playing
					this.emit(msg.update, msg.playing)
					break
				case "realtime":
					const realtime = msg as Realtime
					this.position = realtime.position
					this.emit(msg.update, realtime)
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
				case "speaker_added":
					const speaker = msg.speaker as Speaker
					break
				case "client_joined_group":
					const client = msg.client as Client
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
			setTimeout( () => this.sendAction(new GlobalAction.SpeakerPing()) , 5000);
		}
	}
}
