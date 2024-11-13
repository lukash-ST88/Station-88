export interface IPostCategory {
    name: string;
    slug: string;
}

export const postCategories: IPostCategory[] = [
    {
        name: "Фильмы",
        slug: "movie"
    },
    {
        name: "Статьи",
        slug: "article"
    },
    {
        name: "Книги",
        slug: "book"
    },
    {
        name: "Проекты",
        slug: "project"
    },
    {
        name: "Посты",
        slug: "free_post"
    },
    
]