import React, { useState, useEffect, useRef } from "react";
import PostService from "../services/posts";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { getPageCount, getPagesArray } from "../utils/pages";
import PostCard from "../components/cards/PostCard";
import { connect} from "react-redux";  

function Home(props: any) {
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
      <div className="w-4/6">
        <div> {props.auth.isAuthenticated ? 1 : 0}</div>
        <div>
          {posts.map((post: any, index: number) => {
            return(
            <div>
              <PostCard post={post} index={index} />
            </div>);
          })}
        </div>
      </div>
      <div className="w-2/6"></div>
      <div
        ref={lastElement}
        style={{ height: 10, background: "transperent" }}
      />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  auth: state.auth
});


export default connect(mapStateToProps)(Home);  
// TODO: - correct vertical text
