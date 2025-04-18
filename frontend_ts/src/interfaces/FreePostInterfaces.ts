import { IUser } from "./UserInterfaces" 

export interface IFreePost {
    readonly id: number
    title: string
    url: string
    subtitle: string | undefined
    content: string
    release_date: string 
    author: IUser
    poster: string | undefined 
};