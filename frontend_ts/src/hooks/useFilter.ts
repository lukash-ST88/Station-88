import { useMemo } from "react";
import { IArticle, IMovie } from "../models";

export const useFilter = (posts: any, query: string) => {
    const sortedPosts = useMemo(() => {
      return posts.filter((post: any) => post.title.includes(query));
    }, [query, posts]) 
    return sortedPosts;
};



