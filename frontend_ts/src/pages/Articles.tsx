import { useState, useEffect, useRef } from "react";
import { IArticle, IMovie } from "../models";
import ArticleService from "../services/articles";
import { useNavigate } from "react-router-dom";
import { IFilter } from "./Movies";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import { TransitionGroup } from "react-transition-group";
import Loader from "../components/components/Loader/Loader";
import Filter from "../components/components/Filter/Filter";
import ArticleCard from "../components/cards/ArticleCard";



function Articles() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [filter, setFilter] = useState<IFilter>({ sort: "", query: "" });
  const [totalPages, setTotalPages] = useState<number>(0);
  const sortedAndSearchedArticles: any = usePosts(
    articles,
    filter.sort,    
    filter.query
  );
  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);
  const lastElement = useRef<HTMLDivElement>(null);
  

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
                return <ArticleCard article={article} index={index} />;
              }
            )}
          </div>
        </TransitionGroup>
        <div
          ref={lastElement}
          style={{ height: 10, background: "transperent" }}
        />
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
