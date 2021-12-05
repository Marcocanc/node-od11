export interface Service {
    id: number
    name: string
    requires_authorization: boolean
    supports_liking: boolean
    supports_scrubbing: boolean
}