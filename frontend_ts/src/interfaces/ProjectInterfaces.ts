import { IFrame } from "./FrameInterface"
import { IScenario } from "./ScenarioInterfaces"
import { IUser } from "./UserInterfaces"


export interface IProject {
    readonly id: number
    title: string
    year: number
    end_year: number | undefined
    genre: string
    length: number
    synopsys: string
    scenario: IScenario | undefined
    directors: IUser[] 
    writers: IUser[] 
    cinematographers: IUser[] 
    editors: IUser[] 
    actors: IUser[] 
    designers: IUser[] 
    producers: IUser[] 
    linked_trailer: string | undefined
    linked_film: string | undefined
    release_date: string 
    url: string
    poster: string | undefined
    links: string[] | undefined
    frames: IFrame[] | undefined 
};

export interface  IProjectRetrieve {
    count: number
    next: string | null
    previous: string | null
    results: IProject[] 
};