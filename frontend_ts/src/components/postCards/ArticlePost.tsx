import { IUser } from "../../models";
import dateTime from "../../utils/dateTime";
import { IArticleIndexProps } from "../cards/ArticleCard";
import { useNavigate } from "react-router-dom";

const ArticlePost = (props: IArticleIndexProps) => {
  const navigate = useNavigate();
  return (
    <> 
      <div
        className="container grid grid-cols-16 m-5 border-2 hover:ring-4 z-0 hover:z-10 hover:text-black hover:bg-white hover:ring-white transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
        onClick={() => navigate(`/article/${props.article.url}`)}
      >
        <div className="col-span-1 flex bg-white justify-center text-black items-center transform rotate-180">
          <div className="vertical">
            {props.article.authors?.map((author: IUser, index: number) => {
              return <div key={index}>Автор: {author.profile?.first_name} {author.profile?.last_name}</div>;
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
        <div className="col-span-1 flex bg-white justify-center text-black items-center">
          <div className="vertical">{dateTime(props.article.release_date)}</div>
        </div>
      </div>
    </>
  );
};

export default ArticlePost;
