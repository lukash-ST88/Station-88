export interface IProfile {
    readonly id: number
    user: IUser | undefined
    first_name: string
    last_name: string
    role: string
    avatar: string
}


export interface IUser {
    username: string
    email?: string | null
    profile: IProfile | undefined
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



export interface IST88description {
    readonly id: number 
    description: string
    author: IUser
    movie: IMovie | undefined
    rating: number 
    book: IBook | undefined 
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
    music: string | undefined
    link: string | undefined
    ST88descriptions: IST88description[] | undefined[]
    comments: IReview[] | undefined[]
    release_date: string
    avg_rating: string | null
}



export interface IMovieRetrieve {
    count: number,
    next: string | null
    previous: string | null
    results: IMovie[] 
}

export interface IBook {
    readonly id: number
    title: string
    original_title: string
    url: string
    poster: string
    year: number  
    writer: string
    genre: string
    ebook: string | any
    ST88descriptions: IST88description[] | undefined[]
    comments: IReview[] | undefined[]
    release_date: string
    avg_rating: string | null
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
    authors: IUser[] 
    release_date: string
    article_type: string[] | undefined
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
    readonly id: number
    title: string
    year: number
    synopsys: string
    scenario: IScenario 
    authors: IUser[]
    downloaded_film: string | undefined
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

export interface IFreePost {
    readonly id: number
    title: string
    url: string
    subtitle: string | undefined
    content: string
    release_date: string | null
    author: IUser
    poster: string | undefined 
};