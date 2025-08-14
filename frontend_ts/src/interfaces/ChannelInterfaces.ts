export interface IChannelVideo{
    readonly id: number
    title: string
    url: string
    poster: string
    playlist: IChannelPlaylist | undefined
    duration: number
    release_date: string
    youtube_link: string
    vk_link: string
}

export interface IChannelPlaylist{
    readonly id: number
    title: string
    url: string
    videos: IChannelVideo[] | undefined[]
}

export interface IChannelVideoRetrieve{
    count: number,
    next: string | null
    previous: string | null
    results: IChannelVideo[]
}

export interface IChannelPlaylistRetrieve{
    count: number,
    next: string | null
    previous: string | null
    results: IChannelPlaylist[]
}

export interface IChannelVideoMaxDuration {
    max_duration: number
}