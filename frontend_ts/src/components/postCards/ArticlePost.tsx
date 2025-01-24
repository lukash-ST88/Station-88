import { IUser } from "../../interfaces/UserInterfaces";
import dateTime from "../../utils/dateTime";
import { IArticleIndexProps } from "../cards/ArticleCard";
import { useNavigate } from "react-router-dom";

const ArticlePost = (props: IArticleIndexProps) => {
  const navigate = useNavigate();
  
  return (
      <div className="article-post-container" onClick={() => navigate(`/article/${props.article.url}`)} key={props.index}>
        <div className="article-post-author-container overflow-hidden">
          <div className="vertical">
            <div className="flex justify-center items-center gap-1 divide-y-2">
              <div className="">{props.article.authors?.length > 1 ? 'Авторы' : 'Автор'}:</div>
              {props.article.authors?.map((author: IUser, index: number) => 
                <div key={index} className="pt-1"> {author.profile?.first_name.slice(0,1)}.{author.profile?.last_name}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-14 article-image-container">
          <img className="article-post-image" src={props.article.poster} alt={props.article.title}/>
          <div className="flex justify-center"><div className="post-type-fixed">Статья</div></div>
          <div className="article-text-align  bg-white text-black rounded-lg opacity-90 p-2 group-hover:opacity-none">
            <div className="title">{props.article.title}</div>
            <div className="subtitle">{props.article.subtitle}</div>  
          </div>
        </div>
        <div className="article-post-date  group-hover:opacity-none">
          <div className="vertical flex divide-y-2 gap-1">{dateTime(props.article.release_date).map((dateItem: string)=><div className="pt-1">{dateItem}</div>)}</div>
        </div>
      </div>
  );
};

export default ArticlePost;
