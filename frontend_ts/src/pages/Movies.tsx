import { useState, useEffect, useRef} from "react";
import { IMovie } from "../interfaces/MovieInterfaces";
import MovieService from "../services/movies";
import Filter from "../components/components/Filter/Filter";
import { TransitionGroup } from "react-transition-group";
import { getPageCount} from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/components/Loader/Loader";
import MovieCard from "../components/cards/MovieCard";
import { useDidMountEffect } from "../hooks/useDidMountEffect";
import { useFilter } from "../hooks/useFilter";



export interface IFilter {
  sort: string;
  query: string;
}



function Movies() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [filter, setFilter] = useState<IFilter>({ sort: "", query: "" });
  const [totalPages, setTotalPages] = useState(0);
  const searchedMovies: any = useFilter(
    movies,
    filter.query
  );

  // const sortedAndSearchedPosts = useMemo(() => {
  //   return movies.filter((post: any) => post.title.includes(filter.query));
  // }, [filter.query, movies]); f
  
  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);
  const lastElement = useRef<HTMLDivElement>(null);


  useEffect(() => {
    fetchMovies(limit, offset, filter.sort);
    console.log('offset - ' + offset)
    // console.log(axios.defaults.headers.common['Authorization'])
  }, [offset]);

  // this hook allows not to call useEffect for the first render
  useDidMountEffect(() => {
    console.log("filter - " + offset)
    fetchMovies(limit, 0, filter.sort);
    setOffset(0);
  }, [filter]);

  const [fetchMovies, isMovieLoading, movieError]: any = useFetching(
    async (limit: number, offset: number, sort: string) => {
      const response = sort.length ? await MovieService.getSortedMovies(limit, offset, sort) : await MovieService.getAllMovies(limit, offset);
      if(offset == 0){
        setMovies([...response.data.results]);
      }
      else{
        setMovies([...movies, ...response.data.results]); 
      }
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
      <div className="flex flex-wrap justify-center">
        <div className="lg:w-5/6 lg:order-1 order-2 ">
          <TransitionGroup>
            <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchedMovies.map((movie: IMovie, index: number) => {
                return <MovieCard movie={movie} index={index} />;
              })}
            </div>
          </TransitionGroup>
          <div
            ref={lastElement}
            style={{ height: 10, background: "transperent" }} //"transperent"
          />
          {isMovieLoading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
        </div>
        <div className="lg:w-1/6 lg:order-2 color-test order-1 w-full mb-6">
          <Filter filter={filter} setFilter={setFilter} />
        </div>
      </div>
    </>
  );
}
export default Movies;
