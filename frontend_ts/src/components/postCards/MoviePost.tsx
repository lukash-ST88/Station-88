import { IMovieIndexProps } from "../cards/MovieCard";
import "./postCards.css";
import dateTime from "../../utils/dateTime";
import { useNavigate } from "react-router-dom";

const MoviePost = (props: IMovieIndexProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="container grid grid-cols-16 my-3 lg:my-5 border-2 hover:lg:ring-4 z-0 hover:z-10 hover:lg:text-black hover:lg:bg-white hover:ring-white transition duration-100 ease-in-out transform hover:lg:-translate-y-1 hover:lg:scale-110 hover:cursor-pointer"
        onClick={() => navigate(`/movie/${props.movie.url}`)}
      >
        <img
          className="object-cover col-span-4 h-84 w-auto"
          src={props.movie.poster}
          alt={props.movie.title}
        />
        <div className="col-span-11 justify-self-center self-center text-center">
          <div className="flex justify-center"><div className="fixed top-0 bg-white text-black p-1 text-xs lg:text-base">Фильм</div></div>
          <div className="movie-title-post text-3xl md:text-5xl">{props.movie.title}</div>
          <hr/>
          <div className="movie-original-title-post text-xl md:text-3xl pt-1 lg:pt-2">
            {props.movie.original_title}
          </div>
        </div>
        <div className="col-span-1 flex bg-white justify-center text-black items-center text-[10px] lg:text-sm p-2 lg:p-4">
          <div className="vertical">{dateTime(props.movie.release_date)}</div>
        </div>
      </div>
    </>
  );
};

export default MoviePost;
