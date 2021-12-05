export namespace GroupAction {
	/** Playback controls */
	export namespace Playback {
		/** Start playback */
		export class Start {
			action: string = "playback_start"
		}
		/** Stop playback */
		export class Stop {
			action: string = "playback_stop"
		}
	}
	/** Track controls */
	export namespace Track {
		/** Skip to previous track */ 
		export class SkipToPrev {
			action: string = "track_skip_to_prev"
		}
		/** Skip to next track */ 
		export class SkipToNext {
			action: string = "track_skip_to_next"
		}
		/** Skip to specified track */
		export class SkipToTrack {
			action: string = "track_skip_to"
			track_index: number
			history: boolean
		}
	}
}

export namespace GlobalAction {
	export class GlobalJoin {
		constructor(protocolMajorVersion: number = 0, protocolMinorVersion: number = 4) {
			this.protocol_major_version = protocolMajorVersion
			this.protocol_minor_version = protocolMinorVersion
		}
		action: string = "global_join"
		protocol_major_version: number
		protocol_minor_version: number
	}
	
	export class SpeakerPing {
		constructor(value: number = (new Date).getTime() % 1e6) {
			this.value = value
		}
		action: string = "speaker_ping"
		value: number
	}
	
	export class GroupJoin {
		constructor(
			uid: string,
			name: string = "guest",
			colorIndex: number = 0,
			realtimeData: boolean = true
		) {
			this.uid = uid
			this.name = name
			this.color_index = colorIndex
			this.realtime_data = realtimeData
		}
		action: string = "group_join"
		uid: string
		name: string
		color_index: number
		realtime_data: boolean
	}

	export class ConnectWifiNetwork {
		constructor(ssid: string, password: string, staticIp: string = null) {
			this.ssid = ssid
			this.password = password
			this.static_ip = staticIp
		}

		action: string = "connect_wifi_network"
		ssid: string
		password: string
		static_ip?: string
	}

	export class GetWifiNetworks {
		action: string = "get_wifi_networks"
	}
}

//REMOVE THESE
export class OD11Action {
	
	static init(): any {
		return {
			"protocol_major_version": 0,
			"protocol_minor_version": 4,
			"action": "global_join"
		}
	}
	
	static ping() {
		return {
			value: (new Date).getTime() % 1e6,
			action: "speaker_ping"
		}
	}
	
	static joinGroup() {
		return {
			"action": "group_join",
			"color_index": 0,
			"name": "guest", //could change this to Teenage ID
			"realtime_data":true,
			"uid": ""
		}
	}
	
	static changeVolume(amount: number) {
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
	
	static seekTrack(time): any {
		return {
			"time": time,
			"action": "track_seek"
		}
		
	}
	
	static startPlayback(): any {
		return { "action": "playback_start" }
	}
	
	static stopPlayback(): any {
		return {
			"action": "playback_stop"
		}
	}
	
	static skipTrackToNext(): any {
		return {
			"action": "track_skip_to_next"
		}
	}
	
	static skipTrackToPrev(): any {
		return {
			"action": "track_skip_to_prev"
		}
	}
	
	
	//sound properties
	static setBassBoost(enabled): any {
		return {
			"action": "group_set_eq_bass_boost",
			"enabled": enabled
		}
	}
	
	static setTrebleBoost(enabled): any {
		return {
			"action": "group_set_eq_treble_boost",
			"enabled": enabled
		}
	}
}