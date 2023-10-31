import dateTime from "../../utils/dateTime";
import { IArticleIndexProps } from "../cards/ArticleCard";
import { useNavigate } from "react-router-dom";

const ArticlePost = (props: IArticleIndexProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="container grid grid-cols-16 m-5 border-2 hover:ring-4 z-0 hover:z-10 hover:text-black hover:bg-white hover:ring-white transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
        onClick={() => navigate(`/movie/${props.article.url}`)}
      >
        <div className="col-span-1 bg-white">
          <div className="date">
            {props.article.authors?.map((author: any) => {
              return <div>Автор: {author}</div>;
            })}
          </div>
        </div>
        <div className="col-span-14 article-poster-container">
          <img
            className="object-cover h-96 w-full"
            src={props.article.poster}
            alt={props.article.title}
          />
          <div className="article-text-align">
            <div className="title">{props.article.title}</div>
            <div className="subtitle">{props.article.subtitle}</div>
          </div>
        </div>
        <div className="col-span-1 bg-white">
          <div className="date">{dateTime(props.article.release_date)}</div>
        </div>
      </div>
    </>
  );
};

export default ArticlePost;
