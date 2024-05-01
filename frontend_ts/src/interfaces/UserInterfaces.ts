export interface IProfile {
    readonly id: number
    user: IUser | undefined
    first_name: string
    last_name: string
    role: string
    avatar: string
}


export interface IUser {
    username: string
    email?: string | null
    profile: IProfile | undefined
}