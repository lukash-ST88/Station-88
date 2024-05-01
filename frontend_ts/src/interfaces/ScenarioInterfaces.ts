import { IUser } from "./UserInterfaces"

export interface IScenario {
    title: string
    synopsys: string
    text: string | any
    authors: IUser[] | null
    poster: string
    release_date: string
};