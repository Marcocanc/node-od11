"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.OD11 = void 0;
var OD11Action_1 = require("./OD11Action");
var events_1 = require("events");
var WebSocket = require("ws");
var OD11;
(function (OD11) {
    var WSClient = /** @class */ (function (_super) {
        __extends(WSClient, _super);
        function WSClient(url) {
            if (url === void 0) { url = "ws://OD-11.local/ws"; }
            var _this = _super.call(this) || this;
            _this.clientUid = "uid-" + Math.floor(1e8 * Math.random());
            _this.url = url;
            return _this;
        }
        WSClient.prototype.connect = function () {
            this.ws = new WebSocket(this.url);
            this.setupListeners();
        };
        WSClient.prototype.setupListeners = function () {
            var _this = this;
            this.ws.on('open', function () { return _this.sendAction(new OD11Action_1.GlobalAction.GlobalJoin()); });
            this.ws.on('message', this.parseMessage.bind(this));
            this.ws.on('close', function () {
                setTimeout(this.connect, 5000);
            }.bind(this));
            this.ws.on('error', function () {
                console.log('socket error:');
            });
        };
        WSClient.prototype.parseMessage = function (message) {
            var _this = this;
            //if string parse json (doing this in order to allow recursive parsing)
            var msg = (typeof message == "string") ? JSON.parse(message) : message;
            if (msg.response) {
                switch (msg.response) {
                    case "global_joined":
                        this.sendAction(new OD11Action_1.GlobalAction.GroupJoin(this.clientUid));
                        break;
                    case "group_joined":
                        msg.state.forEach(this.parseMessage.bind(this));
                    case "speaker_pong":
                        this.schedulePing();
                        break;
                    case "error":
                        console.log("Error: " + msg.error);
                        break;
                }
                this.emit(msg.response);
            }
            switch (msg.update) {
                //volume
                case "group_volume_changed":
                    this.volume = msg.vol;
                    this.emit(msg.update, msg.vol);
                    break;
                case "group_max_volume":
                    this.maxVolume = msg.value;
                    this.emit(msg.update);
                    break;
                //playback
                case "track_changed":
                    this.track = msg.track;
                    this.position = 0;
                    this.emit(msg.update, msg.track);
                    break;
                case "playback_state_changed":
                    this.playing = msg.playing;
                    this.emit(msg.update, msg.playing);
                    break;
                case "realtime":
                    var realtime = msg;
                    this.position = realtime.position;
                    this.emit(msg.update, realtime);
                    break;
                //Sound
                case "group_eq_bass_boost":
                    this.bassBoost = msg.enabled;
                    this.emit(msg.update, msg.enabled);
                    break;
                case "group_eq_treble_boost":
                    this.trebleBoost = msg.enabled;
                    this.emit(msg.update, msg.enabled);
                    break;
                case "speaker_added":
                    var speaker = msg.speaker;
                    break;
                case "client_joined_group":
                    var client = msg.client;
                    break;
            }
            if (msg.state) {
                msg.state.forEach(function (state) { return _this.parseMessage(state); });
            }
        };
        WSClient.prototype.sendAction = function (action) {
            var actionJSON = JSON.stringify(action);
            this.ws.send(actionJSON);
        };
        //val between 0 and 100
        WSClient.prototype.setVolume = function (absoluteValue) {
            this.sendAction(OD11Action_1.OD11Action.setVolume(absoluteValue));
        };
        WSClient.prototype.schedulePing = function () {
            var _this = this;
            setTimeout(function () { return _this.sendAction(new OD11Action_1.GlobalAction.SpeakerPing()); }, 5000);
        };
        return WSClient;
    }(events_1.EventEmitter));
    OD11.WSClient = WSClient;
})(OD11 = exports.OD11 || (exports.OD11 = {}));
