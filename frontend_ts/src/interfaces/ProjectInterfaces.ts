import { IScenario } from "./ScenarioInterfaces"
import { IUser } from "./UserInterfaces"


export interface IProject {
    readonly id: number
    title: string
    year: number
    synopsys: string
    scenario: IScenario 
    authors: IUser[]
    linked_trailer: string | undefined
    release_date: string | null
    url: string
    poster: string | undefined
    linked_film: string | undefined
};

export interface  IProjectRetrieve {
    count: number
    next: string | null
    previous: string | null
    results: IProject[] 
};