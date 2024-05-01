import { useState, useEffect } from "react";
import { IMovie } from "../interfaces/MovieInterfaces";
import { useFetching } from "../hooks/useFetching";
import MovieService from "../services/movies";
import { useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import { API_URL } from "../services/settings/urls";
import AccordionMovie from "../components/components/Accordion/AccordionMT";
import { arch } from "os";
import AccordionArticles from "../components/components/Accordion/AccordionArticles";

const Movie = () => {
  const [movie, setMovie] = useState<IMovie>();
  const params = useParams<string>();
  

  useEffect(() => {
    fetchMovie(params.url);
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
          <div className="container lg:flex lg:flex-wrap grid grid-cols-1 justify-center lg:divide-x-2 text-center text-4xl">
            <div className="p-5 movie-title">{movie?.title}</div>
            {Boolean(movie?.original_title) && 
            <div className="p-5 movie-original-title">
              {movie?.original_title}
            </div> 
            }
          </div>
          <div className="container flex flex-wrap justify-center">
            <div className="lg:w-1/3 lg:flex lg:flex-col lg:justify-start my-4 divide-y-2 description-text">
              <img className="my-2" src={`${API_URL}${movie?.poster}`} alt="movie poster"/>
              <div className="text-2xl text-center py-2">
                Режиссёр: {movie?.director}
              </div>
              <div className="text-2xl text-center py-2">
                Год: {movie?.year}
              </div>
              <div className="text-2xl text-center py-2">
                Жанр: {movie?.genre}
              </div>
              {Boolean(movie?.title) && 
              <div className="my-2">
                <iframe
                  title={movie?.title}
                  width="100%"
                  height="300"
                  loading="lazy"
                  src={movie?.link}>
                </iframe>
              </div>
              }
              {Boolean(movie?.music) &&
              <div>
                <audio className="w-full my-2" controls>
                  <source src={`${API_URL}${movie?.music}`} type="audio/mpeg" />
                </audio>
              </div> 
              }
            </div>
            <div className="lg:w-2/3">
              <AccordionMovie movie={movie} />
              {movie?.related_articles && <AccordionArticles articles={movie?.related_articles}/>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
// TODO: add photo
