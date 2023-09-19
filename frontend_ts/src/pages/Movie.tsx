import { useState, useEffect } from "react";
import { IMovie } from "../models";
import { useFetching } from "../hooks/useFetching";
import MovieService from "../services/movies";
import { Link, useNavigate, useParams } from "react-router-dom";
import Filter from "../components/Filter/Filter";
import { usePosts } from "../hooks/usePosts";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getPageCount, getPagesArray } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";

import Loader from "../components/Loader/Loader";

const Movie = () => {
  const [movie, setMovie] = useState<IMovie>();
  const params = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie(params.url);
    // setTimeout(()=>{
    //     setLoading(false)
    // }, 1000)
    console.log(movie?.poster)
  }, []);

  const [fetchMovie, isMovieLoading, movieError]: any = useFetching(
    async (url: string) => {
      const response = await MovieService.getMovieByUrl(url);
      setMovie(response.data);
    }
  );

  return (
    <div>
      <div className="container flex flex-wrap space-x-12 justify-center text-center text-4xl station88">
        <div className="">{movie?.title}</div>
        <div className="">{movie?.original_title}</div>
      </div>
      <div className="container flex">
        <div className="w-1/3">
          {isMovieLoading ? <Loader/> : <img
            className=""
            src="/a_space_odyssey.webp"
          />}
          <div>{movie?.director}</div>
          <div>{movie?.year}</div>
          <div>{movie?. genre}</div>
        </div>
        <div className="2/3">
            <button onClick={()=> fetchMovie(params.url)}> dasd a</button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
