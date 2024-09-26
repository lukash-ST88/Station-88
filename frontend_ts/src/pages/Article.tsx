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
            <div className="p-5">{article?.title}</div>
            <div className="p-5 ">{article?.subtitle}</div>
          </div>
          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: article?.content }} />
          </div>
          <div className="article-authors">
            &nbsp;Автор:&nbsp;
            {article?.authors?.map((author: IUser, index: number) => {
              return (
              <span key={index}>
                 {author.profile?.first_name} {author.profile?.last_name} 
              </span>);
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Article;
// TODO: - add Author name and some style
