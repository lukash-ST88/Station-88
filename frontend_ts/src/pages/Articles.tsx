import { useState, useEffect, useRef } from "react";
import { IArticle } from "../interfaces/ArticleInterfaces";
import ArticleService from "../services/articles";
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
    console.log("effect")
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
    <div className="flex flex-wrap justify-center">
      <div className="lg:w-5/6 lg:order-1 order-2 mt-4 lg:mt-0">
        <TransitionGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
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
      <div className="lg:w-1/6 lg:order-2 color-test order-1 w-full mb-6">
        <Filter filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}

export default Articles;
