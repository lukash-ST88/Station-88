import React, { useState, useEffect, useRef } from "react";
import { IMovie, IArticle } from "../models";
import PostService from "../services/posts";
import ArticleService from "../services/articles";
import Navigation from "../components/containers/Navigation";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/components/Loader/Loader";
import { useObserver } from "../hooks/useObserver";
import { getPageCount, getPagesArray } from "../utils/pages";
import PostCard from "../components/cards/PostCard";

function Home() {
  const [posts, setPosts] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);
  const lastElement: any = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts(limit, offset);
    console.log(posts.map((post: any) => console.log(post.title)));
  }, [offset]);

  // useEffect(()=>{
  //   fetchPosts()
  // }, [])

  // const fetchPosts: any = async ()=> {
  //   return PostService.getAllPosts().then((response)=>{
  //     setPosts(response.data.results)
  //   })
  // }

  const [fetchPosts, isPostLoading, postError]: any = useFetching(
    async (limit: number, offset: number) => {
      const response = await PostService.getAllPosts(limit, offset);
      setPosts([...posts, ...response.data.results]);
      const totalCount = response.data.overall_total;
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(
    lastElement,
    offset / limit + 1 < totalPages,
    () => setOffset(offset + limit),
    isPostLoading
  );

  return (
    <div className="flex">
      <div className="w-5/6">
        <div>
          {posts.map((post: any, index: number) => {
            return(
            <div>
              <PostCard post={post} index={index} />
            </div>);
          })}
        </div>
      </div>
      <div className="w-1/6"></div>
      <div>
        {posts.map((post: any) => {
          return (
            <>
              <div>{post.title}</div>
              <div>{post.type}</div>
            </>
          );
        })}
      </div>

      <div
        ref={lastElement}
        style={{ height: 10, background: "transperent" }}
      />
    </div>
  );
}

export default Home;
