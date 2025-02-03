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
            <h2 className="">{props.movie.title} </h2>
            <h2 className="movie-card-original-title">{props.movie.original_title}</h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            <TimeIcon/>
            <div>{props.movie.year}</div>
          </div>
          <div>
            <div className="movie-card-rating">Рейтинг</div>
            <div className="">CT {props.movie.avg_rating} </div>
          </div>
        </div>
      </div>
      </CSSTransition>
    )
}

export default MovieCard;