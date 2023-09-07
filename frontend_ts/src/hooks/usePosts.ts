import { useMemo } from "react";
import { IArticle, IMovie } from "../models";




export const useSortedPosts = (posts: IMovie[] | IArticle[], sort: string) => {
  const sortedPosts = useMemo(() => {
    if (sort && sort[0] == '+') {
      return [...posts].sort((a: any, b: any) => b[sort.slice(1)] - a[sort.slice(1)]);
    }
    else if(sort && sort[0] == '-'){
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
    return sortedPosts.filter((post) => post.title.includes(query));
  }, [query, sortedPosts]); 
  return sortedAndSearchedPosts;
};
