export interface IProfile {
    readonly id: number
    user: IUser | null
    first_name: string
    last_name: string
    role: string
    avatar: string
}


export interface IUser {
    username: string
    email?: string
    profile: IProfile | null
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
    author: IUser 
    movie: IMovie 
}



export interface IMovie {
    readonly id: number
    title: string
    original_title: string
    url: string
    poster: string
    year: number  
    director: string
    genre: string
    music: string
    link: string
    ST88descriptions: IST88description[] | null[]
    ST88ratings: IST88rating[] | null[]
    comments: IReview[] | null[]
    release_date: string
    avg_rating: string | null
}

export interface IMovieRetrieve {
    count: number,
    next: string | null
    previous: string | null
    results: IMovie[] 
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
    content: string | TrustedHTML
}

export interface IArticleRetrieve {
    count: number,
    next: string | null
    previous: string | null
    results: IArticle[] 
}


export interface IBanners {
    readonly id: number
    title: string
    description: string
    name: string
    banner: string
    link: string
}

export interface IScenario {
    title: string
    synopsys: string
    text: string | any
    authors: IUser[] | null
    poster: string
    release_date: string
}

export interface IProject {
    title: string
    year: number
    synopsys: string
    scenario: IScenario 
    authors: IUser | null
    downloaded_film: string | undefined
    release_date: string | null
    url: string
    poster: string | undefined
}

export interface  IProjectRetrieve {
    count: number
    next: string | null
    previous: string | null
    results: IProject[] 
}