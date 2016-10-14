'use strict'
const assert = require('assert')
const uid = "uid-" + Math.floor(1e8 * Math.random())

class OD11Action {

	static get init() {
		return {
			"protocol_major_version": 0,
			"protocol_minor_version": 4,
			"action": "global_join"
		}
	}

	static get ping() {
		return {
			value: (new Date).getTime() % 1e6,
			action: "speaker_ping"
		}
	}

	static get joinGroup() {
		return {
			"action": "group_join",
			"color_index": 0,
			"name": "guest", //could change this to Teenage ID
			"realtime_data":true,
			"uid": uid
		}
	}

	static changeVolume(amount) {
		return {
			"amount": amount,
			"action": "group_change_volume"
		}
	}

	static setVolume(volume) {
		return {
			"vol": volume,
			"action": "group_set_volume"
		}
	}

	static seekTrack(time) {
		assert(time >= 0 && time <= 1)
		return {
			"time": time,
			"action": "track_seek"
		}

	}

	static get startPlayback() {
		return { "action": "playback_start" }
	}

	static get stopPlayback() {
		return {
			"action": "playback_stop"
		}
	}

	static get skipTrackToNext() {
		return {
			"action": "track_skip_to_next"
		}
	}

	static get skipTrackToPrev() {
		return {
			"action": "track_skip_to_prev"
		}
	}


	//sound properties
	static setBassBoost(enabled) {
		return {
			"action": "group_set_eq_bass_boost",
			"enabled": enabled
		}
	}

	static setTrebleBoost(enabled) {
		return {
			"action": "group_set_eq_treble_boost",
			"enabled": enabled
		}
	}
}

module.exports = OD11Action