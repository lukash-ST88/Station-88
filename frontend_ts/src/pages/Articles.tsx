import { useState, useEffect, useRef } from "react";
import { IArticle, IArticleType } from "../interfaces/ArticleInterfaces";
import ArticleService from "../services/articles";
import ArticleTypeService from "../services/articleTypes"
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import { TransitionGroup } from "react-transition-group";
import Loader from "../components/components/Loader/Loader";
import ArticleCard from "../components/cards/ArticleCard";
import { useDidMountEffect } from "../hooks/useDidMountEffect";
import ArticleFilter from "../components/components/Filter/ArticleFilter";
import { ISearchDate } from "../interfaces/Interfaces";
import { articlesPageMeta } from "../utils/metaContent";



function Articles() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [categories, setCategories] = useState<IArticleType[]>([])
  
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [articleCategorySlug, setArticleCategorySlug] = useState<string>("")
  const [searchDateTime, setSearchDateTime] = useState<ISearchDate>({ 
    startDate: null, 
    endDate: null
  });
 
  
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);
  
  const lastElement = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    if (offset !== 0) {
      fetchArticles(limit, offset, sort);
      console.log('useEffect', offset)
    }
  }, [offset]);

  useEffect(()=>{
    fetchArticleCategories();
  }, [])

  useDidMountEffect(() => {
    fetchArticles(limit, 0, sort);
    setOffset(0);
  }, [sort, search, articleCategorySlug, searchDateTime.startDate, searchDateTime.endDate]);

  const [fetchArticles, isArticleLoading, articleError]: any = useFetching(
    async (limit: number, offset: number, sort: string) => {
      let response;
      if(articleCategorySlug || search || searchDateTime.startDate || searchDateTime.endDate){
        response = await ArticleService.getFilteredArticles(limit, offset, sort, articleCategorySlug, search, searchDateTime.startDate, searchDateTime.endDate);
      } else {
        response = sort.length ? await ArticleService.getSortedArticles(limit, offset, sort) : await ArticleService.getAllArticles(limit, offset);
      }
      if(offset == 0){
        setArticles(response.data.results);
      } else {
        setArticles([...articles, ...response.data.results]);
      }
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

  async function fetchArticleCategories() {
    const response = await ArticleTypeService.getAllArticleTypes();
    setCategories(response.data.results)
  }

  function resetFilter(){
    setSort("");
    setSearch(""); 
    setArticleCategorySlug("");
    setSearchDateTime({ startDate: null, endDate: null });
  }

  return (
    <>
      <title> Статьи </title> 
      <meta name="description" content={articlesPageMeta}/>

      <div className="flex flex-wrap justify-center">
        <div className="lg:w-5/6 lg:order-1 order-2 lg:mt-0">
          <div className="flex justify-center items-center mb-5 lg:hidden">
            <h1 className="border-b-2 cursor-default px-4 py-2 text-st88-main font-bold border-st88-main text-xl">
              Статьи
            </h1>
          </div>
          <TransitionGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
              {articles.map(
                (article: IArticle, index: number) => {
                  return <ArticleCard article={article} index={index} />;
                }
              )}
            </div>
          </TransitionGroup>
          {articles.length === 0 && 
            <div className="flex justify-center">
              <div className="border p-2 border-st88-secondary text-st88-secondary">
                Статьи не найдены
              </div>
            </div>}
          <div
            ref={lastElement}
            style={{ height: 10, backgroundColor: "transparent" }}
          />
          {isArticleLoading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
        </div>
        <div className="lg:w-1/6 lg:order-2 color-test order-1 w-full mb-6">
          <div className="flex justify-center items-center lg:hidden">
            <div className="border-b-2 cursor-default px-4 py-2 text-st88-secondary font-bold border-st88-secondary text-xl">
              Фильтры
            </div>
          </div>
          <ArticleFilter sort={sort} setSort={setSort} 
                        search={search} setSearch={setSearch} 
                        articleCategorySlug={articleCategorySlug} 
                        setArticles={setArticles} 
                        setArticleCategorySlug={setArticleCategorySlug} 
                        setOffset={setOffset} categories={categories}
                        searchDateTime={searchDateTime} setSearchDateTime={setSearchDateTime}/>
          {[search, sort, articleCategorySlug, searchDateTime.startDate].some(item=>item) 
            && 
            <div className="flex justify-center items-center">
              <div className="lg:my-5 mt-10 cursor-pointer border-2 p-2 hover:bg-st88-secondary" onClick={resetFilter}>Сбросить</div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default Articles;
