import React, { useState, useEffect, useRef } from "react";
import PostService from "../services/posts";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { getPageCount} from "../utils/pages";
import PostCard from "../components/cards/PostCard";
import Loader from "../components/components/Loader/Loader";
import { ISearchDate } from "../interfaces/RestInterfaces";
import PostFilter from "../components/components/Filter/PostFilter";
import { useDidMountEffect } from "../hooks/useDidMountEffect";


function Blog() {
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
  

  console.log(postCategory)
  useEffect(() => {
    fetchPosts(limit, offset);
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
      if(offset == 0){
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
    <div className="flex flex-wrap justify-center">
      <div className="lg:w-4/6 order-2 lg:order-1">
      <div className="flex justify-center items-center mb-5 lg:hidden">
          <div className="border-b-2 cursor-default px-4 py-2 text-st88-main font-bold border-st88-main text-2xl">
            Посты
          </div>
        </div>
        <div className="lg:mx-5">
          {posts.map((post: any, index: number) => {
            return (
              <div>
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
      <div className="flex justify-center items-center lg:hidden">
          <div className="border-b-2 cursor-default px-4 py-2 text-st88-secondary font-bold border-st88-secondary text-2xl">
            Фильтры
          </div>
        </div>
        <PostFilter search={search} setSearch={setSearch} 
                    postCategory={postCategory} setPostCategory={setPostCategory}
                    setPosts={setPosts} setOffset={setOffset}
                    searchDateTime={searchDateTime} setSearchDateTime={setSearchDateTime}
          />
          {[search, postCategory, searchDateTime.startDate].some(item=>item) 
          && 
          <div className="flex justify-center items-center">
            <div className="lg:my-5 mt-10 cursor-pointer border-2 p-2 hover:bg-st88-secondary" onClick={resetFilter}>Сбросить</div>
          </div>
        }
      </div>
    </div>
  );
}


export default Blog;

