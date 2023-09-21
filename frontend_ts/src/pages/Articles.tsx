import React, { useState, useEffect, useRef } from "react";
import { IArticle } from "../models";
import ArticleService from "../services/articles";
import { Link, useNavigate } from "react-router-dom";
import { IFilter } from "./Movies";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Loader from "../components/components/Loader/Loader";
import Filter from "../components/components/Filter/Filter";

function Articles() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [filter, setFilter] = useState<IFilter>({ sort: "", query: "" });
  const [totalPages, setTotalPages] = useState(0);
  const sortedAndSearchedArticles: any = usePosts(
    articles,
    filter.sort,
    filter.query
  );
  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);
  const lastElement: any = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(limit, offset);
  }, [offset]);

  const [fetchArticles, isArticleLoading, movieError]: any = useFetching(
    async (limit: number, offset: number) => {
      const response = await ArticleService.getAllArticles(limit, offset);
      setArticles([...articles, ...response.data.results]);
      const totalCount = response.data.count;
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(
    lastElement,
    offset / limit + 1 < totalPages,
    () => setOffset(offset + limit),
    isArticleLoading
  );

  return (
    <div className="flex">
      <div className="w-5/6">
        <TransitionGroup>
          <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
            {sortedAndSearchedArticles.map(
              (article: IArticle, index: number) => {
                return (
                  <CSSTransition key={index} timeout={5000} classNames="post">
                    <div
                      onClick={() => navigate(`/article/${article.url}`)}
                      className="relative border-custom z-0 hover:z-10 hover:text-green-600 hover:ring-4 hover: ring-green-600 transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      <div className="text-center color-card">
                        {article.title}
                      </div>
                      <img
                        src={article.poster}
                        className="object-cover h-48 w-full"
                      />
                      <div className="text-center italic text-sm color-card">
                        {article.subtitle}
                      </div>
                    </div>
                  </CSSTransition>
                );
              }
            )}
          </div>
        </TransitionGroup>
        <div ref={lastElement} style={{ height: 20, background: "green" }} />
        {isArticleLoading && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
      </div>
      <div className="w-1/6 color-test ">
        <Filter filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}

export default Articles;
