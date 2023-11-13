import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import { useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import ArticleService from "../services/articles";
import { IUser } from "../models";
import { title } from "process";

const Article = () => {
  const [article, setArticle] = useState<any>({});
  const params = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle(params.url);
    console.log(article?.poster);
  }, []);

  const [fetchArticle, isArticleLoading, ArticleError]: any = useFetching(
    async (url: string) => {
      const response = await ArticleService.getArticleByUrl(url);
      setArticle(response.data);
      console.log(article.title);
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
          <div className="mx-20 my-5">
            Автор:
            {article?.authors?.map((author: any) => {
              return (
              <span>
                 {author.profile.first_name} {author.profile.last_name} 
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
