import { IUser } from "./UserInterfaces"
import { IMovie } from "./MovieInterfaces"
import { IBook } from "./BookInterfaces"

export interface IReview {
    readonly id: number
    email?: string
    nickname?: string
    user?: string
    text: string
    movie?: string
    scenario?: string
    article?: string
    ST88_project?: string
    project_presentation?: string
};

export interface IST88description {
    readonly id: number 
    description: string
    author: IUser
    movie: IMovie | undefined
    rating: number 
    book: IBook | undefined 
};