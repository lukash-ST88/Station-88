import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import { useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import ArticleService from "../services/articles";
import { IArticle, IUser } from "../models";
import { EmptyObject } from "../customTypes";

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
          <div className="container lg:flex lg:flex-wrap grid grid-cols-1 justify-center lg:divide-x-2 text-center text-4xl Article-title ">
            <div className="p-5">{article?.title}</div>
            <div className="p-5 ">{article?.subtitle}</div>
          </div>
          <div className="container text-4xl px-20">
            <div dangerouslySetInnerHTML={{ __html: article?.content }} />
          </div>
          <div className="mx-20 my-5 border border-r-0 border-t-0 border-b-0 border-green-500 text-2xl" style={{fontFamily: 'Restora', fontStyle: 'italic'}}>
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
