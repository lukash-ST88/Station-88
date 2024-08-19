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
    <div
      onClick={() => navigate(`/movie/${props.movie.url}`)}
      className="grid grid-cols-2 items-between md:flex-row md:max-w-xl border bg-opacity-80 hover:lg:border-st88-main hover:lg:ring-st88-main hover:lg:ring-4 z-0 hover:z-10 hover:shadow-2xl transition duration-100 ease-in-out lg:transform hover:lg:-translate-y-1 hover:lg:scale-110 lg:icons hover:cursor-pointer"
    >
      <img
        className="object-cover w-auto h-72"
        src={props.movie.poster}
        alt={props.movie.title}
      />
      <div className="flex flex-col justify-around color-card items-center text-center p-5 leading-normal">
        <div className="flex flex-col justify-center items-center">
          <MovieIcon/>
          <div className="card-main-text">{props.movie.title} </div>
          <div className="italic text-sm">
            {props.movie.original_title}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <TimeIcon/>
          <div>{props.movie.year}</div>
        </div>
        <div>
          <div className="m-0 p-0 text-[11px]">Рейтинг</div>
          <h4>CT {props.movie.avg_rating} </h4>
        </div>
      </div>
    </div>
  </CSSTransition>)
}


export default MovieCard