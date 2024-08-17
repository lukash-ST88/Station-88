import { IUser } from "../../interfaces/UserInterfaces";
import dateTime from "../../utils/dateTime";
import { IArticleIndexProps } from "../cards/ArticleCard";
import { useNavigate } from "react-router-dom";

const ArticlePost = (props: IArticleIndexProps) => {
  const navigate = useNavigate();
  return (
    <> 
      <div
        className="container group grid grid-cols-16 my-5 border-2 bg-white text-black hover:lg:ring-4 z-0 hover:z-10 hover:lg:text-white hover:lg:bg-black hover:ring-white transition duration-100 ease-in-out transform hover:lg:-translate-y-1 hover:lg:scale-110 hover:cursor-pointer"
        onClick={() => navigate(`/article/${props.article.url}`)}
      >
        <div className="col-span-1 flex justify-center items-center transform rotate-180 text-[10px] lg:text-sm p-2 lg:p-4">
          <div className="vertical">
            {props.article.authors?.map((author: IUser, index: number) => {
              return <div key={index}>Автор: {author.profile?.first_name} {author.profile?.last_name}</div>;
            })}
          </div>
        </div>
        <div className="col-span-14 article-poster-container">
          <img
            className="object-cover h-84 w-full group-hover:lg:opacity-40"
            src={props.article.poster}
            alt={props.article.title}
          />
          <div className="flex justify-center"><div className="fixed bg-white text-black top-0 p-1 text-xs lg:text-base">Статья</div></div>
          <div className="article-text-align  bg-white text-black rounded-lg opacity-90 p-2 group-hover:opacity-none">
            <div className="title text-2xl lg:text-5xl">{props.article.title}</div>
            <div className="subtitle text-sm lg:text-2xl">{props.article.subtitle}</div>  
          </div>
        </div>
        <div className="col-span-1 flex  justify-center  items-center text-[10px] lg:text-sm p-2 lg:p-4 group-hover:opacity-none">
          <div className="vertical">{dateTime(props.article.release_date)}</div>
        </div>
      </div>
    </>
  );
};

export default ArticlePost;
