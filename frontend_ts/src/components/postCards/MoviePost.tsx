import { IMovieIndexProps } from "../cards/MovieCard";
import "./postCards.css";
import dateTime from "../../utils/dateTime";
import { useNavigate } from "react-router-dom";

const MoviePost = (props: IMovieIndexProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="post-container" onClick={() => navigate(`/movie/${props.movie.url}`)} key={props.index}>
      <img className="post-image" src={props.movie.poster} alt={props.movie.title}/>
      <div className="movie-post-text-container">
        <div className="flex justify-center"><div className="post-type-fixed">Фильм</div></div>
        <div className="movie-post-title">{props.movie.title}</div>
        <hr/>
        <div className="movie-post-original-title">
          {props.movie.original_title}
        </div>
      </div>
      <div className="post-date">
        <div className="vertical">{dateTime(props.movie.release_date)}</div>
      </div>
    </div>
  );
};

export default MoviePost;
