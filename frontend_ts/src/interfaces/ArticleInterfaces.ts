import { IUser } from "./UserInterfaces"
import { IMovie } from "./MovieInterfaces"

export interface IArticleType {
    readonly id: number
    title: string
    url: string
    description: string
    photo: string
}

export interface IArticle {
    readonly id: number
    title: string
    url: string
    subtitle: string | undefined
    authors: IUser[] 
    release_date: string
    article_type: string[] | undefined
    poster: string
    content: string | TrustedHTML
    related_movies: IMovie[] | undefined[]
}

export interface IArticleRetrieve {
    count: number,
    next: string | null
    previous: string | null
    results: IArticle[] 
}