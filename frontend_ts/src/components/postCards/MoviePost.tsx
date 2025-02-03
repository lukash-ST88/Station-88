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
        <h2 className="flex justify-center"><div className="post-type-fixed">Фильм</div></h2>
        <h3 className="movie-post-title">{props.movie.title}</h3>
        <hr/>
        <h3 className="movie-post-original-title">
          {props.movie.original_title}
        </h3>
      </div>
      <div className="post-date">
        <div className="vertical flex divide-y-2 gap-1">{dateTime(props.movie.release_date).map((dateItem: string)=><div className="pt-1">{dateItem}</div>)}</div>
      </div>
    </div>
  );
};

export default MoviePost;
