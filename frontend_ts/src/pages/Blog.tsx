import React, { useState, useEffect, useRef, useMemo } from "react";
import PostService from "../services/posts";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { getPageCount} from "../utils/pages";
import PostCard from "../components/cards/PostCard";
import Loader from "../components/components/Loader/Loader";
import { ISearchDate } from "../interfaces/Interfaces";
import PostFilter from "../components/components/Filter/PostFilter";
import { useDidMountEffect } from "../hooks/useDidMountEffect";
import { blogPageMeta } from "../utils/metaContent";
import {
  Collapse,
} from "@material-tailwind/react";
import FilterNav from "../components/components/Filter/FilterNav";



function Blog() {
  const [openNav, setOpenNav] = useState(false);

  const [posts, setPosts] = useState<any>([]);

  const [search, setSearch] = useState<string>("");
  const [postCategory, setPostCategory] = useState<string>("")
  const [searchDateTime, setSearchDateTime] = useState<ISearchDate>({ 
    startDate: null, 
    endDate: null
  });

  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  
  const lastElement = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if (window.innerWidth >= 960) setOpenNav(true);
  },[])

  useEffect(() => {
    fetchPosts(limit, offset);
    console.log("useEffect blog");
  }, [offset]);

  useDidMountEffect(() => {
    fetchPosts(limit, 0);
    setOffset(0);
  }, [search, postCategory, searchDateTime.startDate, searchDateTime.endDate]);

  const [fetchPosts, isPostLoading, postError]: any = useFetching(
    async (limit: number, offset: number) => {
      let response;
      if(postCategory || search || searchDateTime.startDate || searchDateTime.endDate){
        response = await PostService.getFilteredPosts(limit, offset, postCategory, search, searchDateTime.startDate, searchDateTime.endDate);
      } else {
        response = await PostService.getAllPosts(limit, offset);
      }
      if(offset === 0){
        setPosts(response.data.results);
      } else {
        setPosts([...posts, ...response.data.results]);
      }
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

  function resetFilter(){
    setSearch(""); 
    setPostCategory("");
    setSearchDateTime({ startDate: null, endDate: null });
  }

  return (
    <>
      <title> Блог </title> 
      <meta name="description" content={blogPageMeta}/>

      <div className="flex flex-wrap justify-center">
        <div className="lg:w-4/6 order-2 lg:order-1">
          <div className="lg:mx-5">
            {posts.map((post: any, index: number) => {
              return (
                <div className="relative z-[1]">
                  <PostCard post={post} index={index} />
                </div>
              );
            })}
          </div>
          <div ref={lastElement} style={{ height: 5, background: "transperent" }}/>
          {isPostLoading && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}
            {posts.length == 0 && 
              <div className="flex justify-center">
                <div className="border p-2 border-st88-secondary text-st88-secondary">
                  Посты не найдены
                </div>
              </div>
            }
        </div>
        <div className="lg:w-2/6 lg:order-2 order-1">
          <FilterNav openNav={openNav} setOpenNav={setOpenNav} title="Блог"/>
          <Collapse open={openNav} className={`${openNav ? "overflow-visible z-0" : 'overflow-hidden'}`}>
            <PostFilter search={search} setSearch={setSearch} 
                        postCategory={postCategory} setPostCategory={setPostCategory}
                        setPosts={setPosts} setOffset={setOffset}
                        searchDateTime={searchDateTime} setSearchDateTime={setSearchDateTime}
              />
            {[search, postCategory, searchDateTime.startDate].some(item=>item) 
            && 
            <div className="flex justify-center items-center">
              <div className="lg:my-5 lg:mt-10 mt-4  cursor-pointer border-2 p-2 hover:bg-st88-secondary" onClick={resetFilter}>Сбросить</div>
            </div>
            }
          </Collapse>
          
        </div>
      </div>
    </>
  );
}


export default Blog;

