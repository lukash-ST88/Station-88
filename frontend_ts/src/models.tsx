export interface IUser {
    name: string
    email?: string
}

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

}

export interface IST88rating {
    readonly id: number
    rating: number
    author: string
    movie: string
}

export interface IST88description {
    readonly id: number
    description: string
    author: string
    movie: string
}



export interface IMovie {
    readonly id: number
    title: string
    original_title: string
    url: string
    poster: string
    year: number  
    description: string
    director: string
    genre: string
    music: string
    link: string
    ST88descriptions: IST88description[] | null[]
    ST88ratings: IST88rating[] | null[]
    comments: IReview[] | null[]
}

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
    subtitle: string
    authors: string[] | null
    release_date: string
    article_type: string[] | null
    poster: string
    content: string
}