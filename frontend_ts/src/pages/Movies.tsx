import { useState, useEffect, useRef } from "react";
import { IArticle, IMovie } from "../models";
import MovieService from "../services/movies";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../components/components/Filter/Filter";
import { usePosts } from "../hooks/usePosts";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getPageCount, getPagesArray } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/components/Loader/Loader";
import MovieCard from "../components/cards/MovieCard";
import axios from "axios";

export interface IFilter {
  sort: string;
  query: string;
}

function Movies() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [filter, setFilter] = useState<IFilter>({ sort: "", query: "" });
  const [totalPages, setTotalPages] = useState(0);
  const sortedAndSearchedMovies: any = usePosts(
    movies,
    filter.sort,
    filter.query
  );
  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);
  const lastElement: any = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies(limit, offset);
    console.log(axios.defaults.headers.common['Authorization'])
  }, [offset]);

  const [fetchMovies, isMovieLoading, movieError]: any = useFetching(
    async (limit: number, offset: number) => {
      const response = await MovieService.getAllMovies(limit, offset);
      setMovies([...movies, ...response.data.results]);
      const totalCount = response.data.count;
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(
    lastElement,
    offset / limit + 1 < totalPages,
    () => setOffset(offset + limit),
    isMovieLoading
  );

  return (
    <>
      <div className="flex">
        <div className="w-5/6">
          <TransitionGroup>
            <div className="grid grid-cols-3 gap-4">
              {sortedAndSearchedMovies.map((movie: IMovie, index: number) => {
                return <MovieCard movie={movie} index={index} />;
              })}
            </div>
          </TransitionGroup>
          <div
            ref={lastElement}
            style={{ height: 10, background: "transperent" }}
          />
          {isMovieLoading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
        </div>
        <div className="w-1/6 color-test ">
          <Filter filter={filter} setFilter={setFilter} />
        </div>
      </div>
    </>
  );
}
export default Movies;
