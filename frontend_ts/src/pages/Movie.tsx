import { useState, useEffect } from "react";
import { IMovie } from "../models";
import { useFetching } from "../hooks/useFetching";
import MovieService from "../services/movies";
import { Link, useNavigate, useParams } from "react-router-dom";
import Filter from "../components/components/Filter/Filter";
import { usePosts } from "../hooks/usePosts";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getPageCount, getPagesArray } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import Accordion from "../components/components/Accordion/Accordion";
import Loader from "../components/components/Loader/Loader";
import { API_URL } from "../services/settings/urls";
import AccordionMT from "../components/components/Accordion/AccordionMT";


const Movie = () => {
  const [movie, setMovie] = useState<IMovie>();
  const params = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie(params.url);
    // setTimeout(()=>{
    //     setLoading(false)
    // }, 1000)
    console.log(movie?.poster);
    console.log(movie?.link);
    console.log(movie?.music);
  }, []);

  const [fetchMovie, isMovieLoading, movieError]: any = useFetching(
    async (url: string) => {
      const response = await MovieService.getMovieByUrl(url);
      setMovie(response.data);
    }
  );

  return (
    <>
      {isMovieLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="container lg:flex lg:flex-wrap grid grid-cols-1 justify-center lg:divide-x-2 text-center text-4xl movie-title ">
            <div className="p-5">{movie?.title}</div>
            <div className="p-5 ">{movie?.original_title}</div>
          </div>
          <div className="container flex ">
            <div className="w-1/3 flex flex-col justify-around my-4 divide-y-2">
              <img className="my-2" src={`${API_URL}${movie?.poster}`} />
              <div className="text-2xl text-center my-2">Режиссёр: {movie?.director}</div>
              <div className="text-2xl text-center my-2">Год: {movie?.year}</div>
              <div className="text-2xl text-center my-2">Жанр: {movie?.genre}</div>
              <div className="my-2">
                <iframe
                  width="100%"
                  height="300"
                  loading="lazy"
                  src={movie?.link}
                ></iframe>
                </div>
                <div>
                <audio className="w-full my-2" controls>
                  <source src={`${API_URL}${movie?.music}`} type="audio/mpeg" />
                </audio>
              </div>
            </div>
            <div className="w-2/3">
              <AccordionMT movie={movie} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
// TODO: correct accordion
// TODO: add photo