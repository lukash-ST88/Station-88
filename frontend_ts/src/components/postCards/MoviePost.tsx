import { IMovieIndexProps } from "../cards/MovieCard";
import "./postCards.css";
import dateTime from "../../utils/dateTime";
import { useNavigate } from "react-router-dom";

const MoviePost = (props: IMovieIndexProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="container grid grid-cols-16 m-5 border-2 hover:ring-4 z-0 hover:z-10 hover:text-black hover:bg-white hover:ring-white transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
        onClick={() => navigate(`/movie/${props.movie.url}`)}
      >
        <img
          className="object-cover col-span-4 h-84 w-full "
          src={props.movie.poster}
          alt={props.movie.title}
        />
        <div className="col-span-11 justify-self-center self-center text-center divide-y-2">
          <div className="movie-title-post">{props.movie.title}</div>
          <div className="movie-original-title-post">
            {props.movie.original_title}
          </div>
        </div>
        <div className="col-auto bg-white">
          <div className="date">{dateTime(props.movie.release_date)}</div>
        </div>
      </div>
    </>
  );
};

export default MoviePost;
