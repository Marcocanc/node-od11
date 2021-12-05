import { OD11 } from "./src/OD11"

const od = new OD11.WSClient()

od.connect()


od.on('realtime', (realtime) => {
	console.log("Realtime " + realtime.position)
})
od.on('playback_state_changed', (playing) => {
	console.log("Playing " + playing)
})

od.on('client_joined_group', (client) => {
	console.log("Playing " + client)
})