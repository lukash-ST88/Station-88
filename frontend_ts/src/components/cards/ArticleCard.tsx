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
      <div onClick={() => navigate(`/article/${props.article.url}`)} className="article-card-container">
        <div className="article-card-title">{props.article.title} </div>
        <img src={props.article.poster} className="object-cover h-48 w-full" alt={props.article.title}/>
        <div className="article-card-subtitle">{props.article.subtitle}</div>
      </div>
    </CSSTransition>
  );  
};

export default ArticleCard

// TODO:  - add modal for article type description