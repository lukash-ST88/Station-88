import { CSSTransition} from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../interfaces/MovieInterfaces";
import "./cards.css"
import MovieIcon from "../icons/MovieIcon";
import TimeIcon from "../icons/TimeIcon";


export interface IMovieIndexProps {
    movie: IMovie
    index: number
}

const MovieCard = (props: IMovieIndexProps)=> {
    const navigate = useNavigate();

    return (
      <CSSTransition key={props.index} timeout={5000} classNames="post">
      <div onClick={() => navigate(`/movie/${props.movie.url}`)} className="movie-card-container lg:icons">
        <img className="movie-card-image" src={props.movie.poster} alt={props.movie.title}/>
        <div className="movie-card-text-container">
          <div className="flex flex-col justify-center items-center">
            <MovieIcon/>
            <div className="">{props.movie.title} </div>
            <div className="movie-card-original-title">{props.movie.original_title}</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <TimeIcon/>
            <div>{props.movie.year}</div>
          </div>
          <div>
            <div className="movie-card-rating">Рейтинг</div>
            <h4>CT {props.movie.avg_rating} </h4>
          </div>
        </div>
      </div>
      </CSSTransition>
    )
}

export default MovieCard;