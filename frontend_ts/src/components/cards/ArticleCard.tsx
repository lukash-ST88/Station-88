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
        <h2 className="article-card-title" style={{ whiteSpace: 'pre-wrap' }}>{props.article.title} </h2>
        <img src={props.article.poster} className="object-cover h-48 w-full" alt={props.article.title}/>
        <h3 className="article-card-subtitle" style={{ whiteSpace: 'pre-wrap' }}>{props.article.subtitle || "\u00A0"} </h3>
      </div>
    </CSSTransition>
  );  
};

export default ArticleCard

// TODO:  - add modal for article type description