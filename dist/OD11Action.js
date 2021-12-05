"use strict";
exports.__esModule = true;
exports.OD11Action = exports.GlobalAction = exports.GroupAction = void 0;
var GroupAction;
(function (GroupAction) {
    /** Playback controls */
    var Playback;
    (function (Playback) {
        /** Start playback */
        var Start = /** @class */ (function () {
            function Start() {
                this.action = "playback_start";
            }
            return Start;
        }());
        Playback.Start = Start;
        /** Stop playback */
        var Stop = /** @class */ (function () {
            function Stop() {
                this.action = "playback_stop";
            }
            return Stop;
        }());
        Playback.Stop = Stop;
    })(Playback = GroupAction.Playback || (GroupAction.Playback = {}));
    /** Track controls */
    var Track;
    (function (Track) {
        /** Skip to previous track */
        var SkipToPrev = /** @class */ (function () {
            function SkipToPrev() {
                this.action = "track_skip_to_prev";
            }
            return SkipToPrev;
        }());
        Track.SkipToPrev = SkipToPrev;
        /** Skip to next track */
        var SkipToNext = /** @class */ (function () {
            function SkipToNext() {
                this.action = "track_skip_to_next";
            }
            return SkipToNext;
        }());
        Track.SkipToNext = SkipToNext;
        /** Skip to specified track */
        var SkipToTrack = /** @class */ (function () {
            function SkipToTrack() {
                this.action = "track_skip_to";
            }
            return SkipToTrack;
        }());
        Track.SkipToTrack = SkipToTrack;
    })(Track = GroupAction.Track || (GroupAction.Track = {}));
})(GroupAction = exports.GroupAction || (exports.GroupAction = {}));
var GlobalAction;
(function (GlobalAction) {
    var GlobalJoin = /** @class */ (function () {
        function GlobalJoin(protocolMajorVersion, protocolMinorVersion) {
            if (protocolMajorVersion === void 0) { protocolMajorVersion = 0; }
            if (protocolMinorVersion === void 0) { protocolMinorVersion = 4; }
            this.action = "global_join";
            this.protocol_major_version = protocolMajorVersion;
            this.protocol_minor_version = protocolMinorVersion;
        }
        return GlobalJoin;
    }());
    GlobalAction.GlobalJoin = GlobalJoin;
    var SpeakerPing = /** @class */ (function () {
        function SpeakerPing(value) {
            if (value === void 0) { value = (new Date).getTime() % 1e6; }
            this.action = "speaker_ping";
            this.value = value;
        }
        return SpeakerPing;
    }());
    GlobalAction.SpeakerPing = SpeakerPing;
    var GroupJoin = /** @class */ (function () {
        function GroupJoin(uid, name, colorIndex, realtimeData) {
            if (name === void 0) { name = "guest"; }
            if (colorIndex === void 0) { colorIndex = 0; }
            if (realtimeData === void 0) { realtimeData = true; }
            this.action = "group_join";
            this.uid = uid;
            this.name = name;
            this.color_index = colorIndex;
            this.realtime_data = realtimeData;
        }
        return GroupJoin;
    }());
    GlobalAction.GroupJoin = GroupJoin;
    var ConnectWifiNetwork = /** @class */ (function () {
        function ConnectWifiNetwork(ssid, password, staticIp) {
            if (staticIp === void 0) { staticIp = null; }
            this.action = "connect_wifi_network";
            this.ssid = ssid;
            this.password = password;
            this.static_ip = staticIp;
        }
        return ConnectWifiNetwork;
    }());
    GlobalAction.ConnectWifiNetwork = ConnectWifiNetwork;
    var GetWifiNetworks = /** @class */ (function () {
        function GetWifiNetworks() {
            this.action = "get_wifi_networks";
        }
        return GetWifiNetworks;
    }());
    GlobalAction.GetWifiNetworks = GetWifiNetworks;
})(GlobalAction = exports.GlobalAction || (exports.GlobalAction = {}));
//REMOVE THESE
var OD11Action = /** @class */ (function () {
    function OD11Action() {
    }
    OD11Action.init = function () {
        return {
            "protocol_major_version": 0,
            "protocol_minor_version": 4,
            "action": "global_join"
        };
    };
    OD11Action.ping = function () {
        return {
            value: (new Date).getTime() % 1e6,
            action: "speaker_ping"
        };
    };
    OD11Action.joinGroup = function () {
        return {
            "action": "group_join",
            "color_index": 0,
            "name": "guest",
            "realtime_data": true,
            "uid": ""
        };
    };
    OD11Action.changeVolume = function (amount) {
        return {
            "amount": amount,
            "action": "group_change_volume"
        };
    };
    OD11Action.setVolume = function (volume) {
        return {
            "vol": volume,
            "action": "group_set_volume"
        };
    };
    OD11Action.seekTrack = function (time) {
        return {
            "time": time,
            "action": "track_seek"
        };
    };
    OD11Action.startPlayback = function () {
        return { "action": "playback_start" };
    };
    OD11Action.stopPlayback = function () {
        return {
            "action": "playback_stop"
        };
    };
    OD11Action.skipTrackToNext = function () {
        return {
            "action": "track_skip_to_next"
        };
    };
    OD11Action.skipTrackToPrev = function () {
        return {
            "action": "track_skip_to_prev"
        };
    };
    //sound properties
    OD11Action.setBassBoost = function (enabled) {
        return {
            "action": "group_set_eq_bass_boost",
            "enabled": enabled
        };
    };
    OD11Action.setTrebleBoost = function (enabled) {
        return {
            "action": "group_set_eq_treble_boost",
            "enabled": enabled
        };
    };
    return OD11Action;
}());
exports.OD11Action = OD11Action;
