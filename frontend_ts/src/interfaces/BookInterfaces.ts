import { IST88description } from "./ReviewDescriptionInterfaces"
import { IReview } from "./ReviewDescriptionInterfaces"

export interface IBook {
    readonly id: number
    title: string
    original_title: string | undefined
    url: string
    poster: string
    year: number  
    writer: string
    genre: string
    ebook: string | undefined
    ST88descriptions: IST88description[] | undefined[]
    comments: IReview[] | undefined[]
    release_date: string
    avg_rating: string | null
}