import { useMemo } from "react";
import { IArticle } from "../interfaces/ArticleInterfaces";
import { IMovie } from "../interfaces/MovieInterfaces";

export interface IusePosts {
  posts: IMovie[] | IArticle[]
  sort: string
  query: string
}


export const useSortedPosts = (posts: IMovie[] | IArticle[], sort: string) => {
  const sortedPosts = useMemo(() => {
    if (sort && sort[0] === '+') {
      return [...posts].sort((a: any, b: any) => b[sort.slice(1)] - a[sort.slice(1)]);
    }
    else if(sort && sort[0] === '-'){
      console.log((posts.map((post:any)=> post[sort.slice(1)]))) 
      return [...posts].sort((a: any, b: any) => a[sort.slice(1)] - b[sort.slice(1)]);
    }
    return posts;
  }, [sort, posts]);
  return sortedPosts;
};



export const usePosts = (posts: IMovie[] | IArticle[], sort: string, query: string) => {
  const sortedPosts = useSortedPosts(posts, sort);
 

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post: any) => post.title.includes(query));
  }, [query, posts]); 
  return sortedAndSearchedPosts;
};
