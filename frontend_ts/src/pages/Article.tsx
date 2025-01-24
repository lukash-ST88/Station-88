import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import { useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import ArticleService from "../services/articles";
import { IArticle} from "../interfaces/ArticleInterfaces";
import {IUser} from "../interfaces/UserInterfaces";
import "./pages.css"


const Article = () => {
  const [article, setArticle] = useState<IArticle>({} as IArticle);
  const params = useParams<string>();
  
  useEffect(() => {
    fetchArticle(params.url);
  }, []);

  const [fetchArticle, isArticleLoading, ArticleError]: any = useFetching(
    async (url: string) => {
      const response = await ArticleService.getArticleByUrl(url);
      setArticle(response.data);
    }
  );

  return (
    <>
      {isArticleLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="article-title-container">
            <div className="article-title">{article?.title}</div>
            <div className="article-subtitle">{article?.subtitle}</div>
          </div>
          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: article?.content }} className="article-font"/>
          </div>
          <div className="article-authors">
            <div className="pl-2"> {article?.authors?.length > 1 ? 'Авторы:': 'Автор:'} </div>
            <div className="flex justify-start divide-x-2 divide-gray-600 items-center">
              {article?.authors?.map((author: IUser, index: number) => {
                return (
                <span key={index} className="lg:p-2 p-1">
                  {author.profile?.first_name} {author.profile?.last_name} 
                </span>);
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Article;

