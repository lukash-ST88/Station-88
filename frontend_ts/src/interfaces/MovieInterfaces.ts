import { IST88description } from "./ReviewDescriptionInterfaces"
import { IReview } from "./ReviewDescriptionInterfaces"
import { IArticle } from "./ArticleInterfaces"

export interface IMovie {
    readonly id: number
    title: string
    original_title: string | undefined
    url: string
    poster: string
    year: number
    director: string
    genre: string
    music: string | undefined
    link: string | undefined
    ST88descriptions: IST88description[] | undefined[]
    comments: IReview[] | undefined[]
    release_date: string
    related_articles: IArticle[] | undefined[]
    avg_rating: string | null
}



export interface IMovieRetrieve {
    count: number,
    next: string | null
    previous: string | null
    results: IMovie[]
}