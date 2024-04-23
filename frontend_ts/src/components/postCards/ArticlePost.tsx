import { IUser } from "../../models";
import dateTime from "../../utils/dateTime";
import { IArticleIndexProps } from "../cards/ArticleCard";
import { useNavigate } from "react-router-dom";

const ArticlePost = (props: IArticleIndexProps) => {
  const navigate = useNavigate();
  return (
    <> 
      <div
        className="container grid grid-cols-16 m-5 border-2 bg-white text-black hover:ring-4 z-0 hover:z-10 hover:text-white hover:bg-black hover:ring-white transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
        onClick={() => navigate(`/article/${props.article.url}`)}
      >
        <div className="col-span-1 flex justify-center items-center transform rotate-180">
          <div className="vertical">
            {props.article.authors?.map((author: IUser, index: number) => {
              return <div key={index}>Автор: {author.profile?.first_name} {author.profile?.last_name}</div>;
            })}
          </div>
        </div>
        <div className="col-span-14 article-poster-container">
          <img
            className="object-cover h-96 w-full hover:opacity-40"
            src={props.article.poster}
            alt={props.article.title}
          />
          <div className="flex justify-center"><div className="fixed bg-white text-black top-0  p-1">Статья</div></div>
          <div className="article-text-align  bg-white text-black hover:text-white rounded-lg opacity-90 p-2 ">
            <div className="title">{props.article.title}</div>
            <div className="subtitle ">{props.article.subtitle}</div>  
          </div>
        </div>
        <div className="col-span-1 flex  justify-center  items-center">
          <div className="vertical">{dateTime(props.article.release_date)}</div>
        </div>
      </div>
    </>
  );
};

export default ArticlePost;
