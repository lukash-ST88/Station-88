import { useState, useEffect } from "react";
import { IMovie } from "../interfaces/MovieInterfaces";
import { useFetching } from "../hooks/useFetching";
import MovieService from "../services/movies";
import { useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import { API_URL } from "../services/settings/urls";
import AccordionMovie from "../components/components/Accordion/AccordionMT";
import AccordionArticles from "../components/components/Accordion/AccordionArticles";
import MovieIcon from "../components/icons/MovieIcon";
import TimeIcon from "../components/icons/TimeIcon";
import GenreIcon from "../components/icons/GenreIcon";
import AccordionFrames from "../components/components/Accordion/AccordionFrames";

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
          <div className="movie-title-container">
            <div className="movie-title">{movie?.title}</div>
            {Boolean(movie?.original_title) && 
            <div className="movie-original-title">
              {movie?.original_title}
            </div> 
            }
          </div>
          <div className="container flex flex-wrap justify-center">
            <div className="lg:w-1/3 lg:flex lg:flex-col lg:justify-start my-4 divide-y-2 description-text">
              <div className="md:grid md:grid-cols-2 md:gap-2 lg:divide-y-2 lg:block">
                <img className="my-2" src={`${API_URL}${movie?.poster}`} alt="movie poster"/>
                <div className="divide-y-2">
                  <div className="movie-description">
                    <MovieIcon/> 
                    <div>Режиссёр: {movie?.director}</div>
                  </div>
                  <div className="movie-description">
                    <TimeIcon/>
                    <div>Год: {movie?.year}</div>
                  </div>
                  <div className="movie-description">
                    <GenreIcon/>
                    <div>Жанр: {movie?.genre}</div>
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
              </div>
            </div>
            <div className="lg:w-2/3">
              <AccordionMovie movie={movie} />
              {movie?.frames && movie.frames.length > 0 && <AccordionFrames movie={movie!} />}
              {movie?.related_articles.length ? <AccordionArticles articles={movie?.related_articles}/> : <></>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
// TODO: add photo
