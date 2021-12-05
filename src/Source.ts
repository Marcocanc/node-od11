export interface Source {
    id: number
    name: string
    supports_jump_to_track_url: boolean
    supports_meta: boolean
    supports_pause: boolean
    supports_seek: boolean
    supports_skip: boolean
    supports_track_position: boolean
}