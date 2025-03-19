import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import { useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import ArticleService from "../services/articles";
import { IArticle} from "../interfaces/ArticleInterfaces";
import {IUser} from "../interfaces/UserInterfaces";
import "./pages.css"
import { articlesPageMeta } from "../utils/metaContent";


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
      <title> {article?.title} </title> 
      <meta name="description" content={article?.synopsys}/>

      {isArticleLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="article-title-container">
            <h1 className="article-title">{article?.title}</h1>
            {Boolean(article.subtitle) && 
              <h2 className="article-subtitle">{article?.subtitle}</h2>
            }
          </div>
          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: article?.content }} className="ckeditor-content"/>
          </div>
          <div className="article-authors">
            <div className="pl-2"> {article?.authors?.length > 1 ? 'Авторы:': 'Автор:'} </div>
            <div className="flex justify-start divide-x-2 divide-gray-600 items-center">
              {article?.authors?.map((author: IUser, index: number) => {
                return (
                <h3 key={index} className="lg:p-2 p-1">
                  {author.profile?.first_name} {author.profile?.last_name} 
                </h3>);
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Article;

