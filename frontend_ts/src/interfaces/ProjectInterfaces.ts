import { IScenario } from "./ScenarioInterfaces"
import { IUser } from "./UserInterfaces"


export interface IProject {
    readonly id: number
    title: string
    year: number
    genre: string
    length: number
    synopsys: string
    scenario: IScenario 
    directors: IUser[] 
    writers: IUser[] 
    cinematographers: IUser[] 
    editors: IUser[] 
    actors: IUser[] 
    designers: IUser[] 
    producers: IUser[] 
    linked_trailer: string | undefined
    linked_film: string | undefined
    release_date: string | null
    url: string
    poster: string | undefined
    links: string[] | undefined 
};

export interface  IProjectRetrieve {
    count: number
    next: string | null
    previous: string | null
    results: IProject[] 
};