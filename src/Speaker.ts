export interface Speaker {
    box_serial: string;
    bt: boolean;
    channel: string;
    channel_setting: string;
    channel_switch_state: string;
    configured: boolean;
    group_id: string;
    ip: string;
    linein: boolean;
    mac: string;
    mcu_serial: string;
    muted: boolean;
    num_friends: number;
    revision: string;
    sleep_enable: boolean;
    ssid: string;
    toslink: boolean;
    uuid: string;
    wifi_quality: number;
}
