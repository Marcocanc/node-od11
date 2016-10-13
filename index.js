const OD11 = require('./lib/OD11')

var od = new OD11("OD-11.local")
od.connect()
od.on('group_volume_changed', function(volume) {
	console.log("vol changed: " + volume)
})