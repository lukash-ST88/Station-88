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
import { YearRepresentation } from "../utils/dataRepresentation";

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
      <title> {movie?.title} </title> 
      <meta name="description" content={`Рецензии на фильм "${movie?.title}"`}/>

      {isMovieLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="movie-title-container">
            <h1 className="movie-title">{movie?.title}</h1>
            {Boolean(movie?.original_title) && 
            <h1 className="movie-original-title">
              {movie?.original_title}
            </h1> 
            }
          </div>
          <div className="container flex flex-wrap justify-center">
            <div className="lg:w-1/3 lg:flex lg:flex-col lg:justify-start lg:my-4 divide-y-2">
              <div className="md:grid md:grid-cols-2 md:gap-2 lg:divide-y-2 lg:block min-w-[250px]">
                <div className="flex justify-center items-center"><img className="my-2 w-[200px] lg:w-[360px]" src={`${API_URL}${movie?.poster}`} alt="movie poster"/></div>
                <div className="divide-y-2">
                  <div className="movie-description">
                    <MovieIcon/> 
                    <h1>Режиссёр: {movie?.director}</h1>
                  </div>
                  <div className="movie-description">
                    <TimeIcon/>
                    <div>Год: {YearRepresentation(movie?.year, movie?.end_year)}</div>
                  </div>
                  <div className="movie-description">
                    <GenreIcon/>
                    <div>Жанр: {movie?.genre}</div>
                  </div>
                  {Boolean(movie?.link) && 
                    <div className="flex justify-center">
                      <div className="my-2 w-[200px] lg:w-[360px]">
                        <iframe
                          title={movie?.title}
                          width="100%"
                          loading="lazy"
                          src={movie?.link}>
                        </iframe>
                      </div>
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
              <div className="lg:mx-4"><AccordionMovie movie={movie} /></div>
              {movie?.frames && movie.frames.length > 0 && <div className="lg:mx-4"><AccordionFrames item={movie!}/></div>}
              {movie?.related_articles.length ? <AccordionArticles articles={movie?.related_articles}/> : <></>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;

