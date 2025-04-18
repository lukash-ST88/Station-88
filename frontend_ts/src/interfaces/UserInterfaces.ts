export interface IProfile {
    readonly id: number
    user: IUser | undefined
    first_name: string
    last_name: string
    role: string
    avatar: string
    photo: string
    order: number
    instagram_link?: string
    telegram_link?: string
    vk_link?: string
}


export interface IUser {
    username: string
    email?: string | null
    is_staff: boolean
    profile: IProfile | undefined
}