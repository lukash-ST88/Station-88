import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import { useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import ArticleService from "../services/articles";


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
          <div className="container text-xl px-20">
          <div dangerouslySetInnerHTML={{__html: article?.content}}/>
          </div>
        </div>
      )}
    </>
  );
};

export default Article;
// TODO: - add Author name and some style
