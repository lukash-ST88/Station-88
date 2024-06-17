import { useNavigate } from "react-router-dom";
import { CSSTransition} from "react-transition-group";
import { IArticle } from "../../interfaces/ArticleInterfaces";
import "./cards.css"

export interface IArticleIndexProps {
  article: IArticle;
  index: number;
}

const ArticleCard = (props: IArticleIndexProps) => {
    const navigate = useNavigate()
  return (
    <CSSTransition key={props.index} timeout={5000} classNames="post">
      <div
        onClick={() => navigate(`/article/${props.article.url}`)}
        className="relative border-custom z-0 hover:z-10 hover:text-green-600 hover:ring-4 hover:ring-green-600 hover:cursor-pointer transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      >
        <div className="text-center color-card card-main-text">{props.article.title}</div>
        <img src={props.article.poster} className="object-cover h-48 w-full" alt={props.article.title}/>
        <div className="text-center italic text-sm color-card">
          {props.article.subtitle}
        </div>
      </div>
    </CSSTransition>
  );
};

export default ArticleCard

// TODO:  - add modal for article type description