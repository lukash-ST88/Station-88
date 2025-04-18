import { IST88description } from "./ReviewDescriptionInterfaces"
import { IReview } from "./ReviewDescriptionInterfaces"

export interface IBook {
    readonly id: number
    title: string
    original_title: string | undefined
    url: string
    poster: string
    year: number
    end_year: number | undefined
    writer: string
    genre: string
    ebook: string | undefined
    links: string[]
    ST88descriptions: IST88description[] | undefined[]
    comments: IReview[] | undefined[]
    release_date: string
    avg_rating: string | null
}