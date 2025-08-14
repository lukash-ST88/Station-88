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
    outer_directors: string[] | undefined
    writers: IUser[] 
    outer_writers: string[] | undefined
    cinematographers: IUser[] 
    outer_cinematographers: string[] | undefined
    editors: IUser[] 
    outer_editors: string[] | undefined
    actors: IUser[] 
    outer_actors: string[] | undefined
    designers: IUser[] 
    outer_designers: string[] | undefined
    producers: IUser[] 
    outer_producers: string[] | undefined
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