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
          <div className="container flex">
            <div className="w-1/3 flex flex-col m-4">
              <img src={`${API_URL}${movie?.poster}`} />
              <div>
                <audio controls>
                  <source src={`${API_URL}${movie?.music}`} type="audio/mpeg" />
                </audio>
              </div>
              <div className="text-2xl">Режиссёр: {movie?.director}</div>
              <div className="text-2xl">Год: {movie?.year}</div>
              <div className="text-2xl">Жанр: {movie?.genre}</div>
              <div>
                <video width="320" height="240" controls>
                  <source src={movie?.link} type="video/mp4" />
                  <source src={movie?.link} type="video/ogg" />
                </video>
                <iframe
                  width="400"
                  height="300"
                  loading="lazy"
                  src="https://www.youtube.com/embed/mS8YraEXC9c?si=DG92Kt4kaAXVKSFQ"
                ></iframe>
                {/* <iframe src="https://platform.twitter.com/widgets/tweet_button.html" style={{border: '0', width:'130px', height:'20px'}}></iframe> */}
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/mS8YraEXC9c?si=DG92Kt4kaAXVKSFQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe> */}
              </div>
            </div>
            <div className="w-2/3">
              <Accordion movie={movie} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
// TODO: correct accordion
// TODO: correct video