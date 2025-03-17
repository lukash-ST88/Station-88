import { useState, useEffect, useRef, useMemo} from "react";
import { IMovie } from "../interfaces/MovieInterfaces";
import MovieService from "../services/movies";
import { TransitionGroup } from "react-transition-group";
import { getPageCount} from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/components/Loader/Loader";
import MovieCard from "../components/cards/MovieCard";
import { useDidMountEffect } from "../hooks/useDidMountEffect";
import MovieFilter from "../components/components/Filter/MovieFilter";
import { moviesPageMeta } from "../utils/metaContent";
import {
  Collapse,
} from "@material-tailwind/react";
import FilterNav from "../components/components/Filter/FilterNav";





function Movies() {
  const [openNav, setOpenNav] = useState(false);

  const [movies, setMovies] = useState<IMovie[]>([]);


  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const defaultYears = [1888, Number(new Date().getFullYear())];
  const [releaseYears, setReleaseYears] = useState<number[]>(defaultYears); 

  const [totalPages, setTotalPages] = useState(0);

  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);
  const lastElement = useRef<HTMLDivElement>(null);

   
  const memoOffset = useMemo(() => offset, [offset]);
  
  useEffect(()=>{
    if (window.innerWidth >= 960) setOpenNav(true);
  },[])

  useEffect(() => {
      fetchMovies(limit, offset, sort);
  }, [offset]);

  // this hook allows not to call useEffect for the first render
  useDidMountEffect(() => {
    fetchMovies(limit, 0, sort);
    setOffset(0);
  }, [sort, search, releaseYears]);

  const [fetchMovies, isMovieLoading, movieError]: any = useFetching(
    async (limit: number, offset: number, sort: string) => {
      let response;
      if (search || releaseYears != defaultYears) {
        if(releaseYears != defaultYears){
          response = await MovieService.getFilteredMovies(limit, offset, sort, search, releaseYears[0], releaseYears[1]);
        } else {
          response = await MovieService.getFilteredMovies(limit, offset, sort, search);
        }
      } else {
        response = sort.length ? await MovieService.getSortedMovies(limit, offset, sort) : await MovieService.getAllMovies(limit, offset);
      }
      if(offset == 0) {
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

  function resetFilter(){
    setSort("");
    setSearch(""); 
  }

  return (
    <>
      <title> Фильмы </title> 
      <meta name="description" content={moviesPageMeta}/>

      <div className="flex flex-wrap justify-center">
        <div className="lg:w-5/6 lg:order-1 order-2 ">
          <TransitionGroup>
            <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {movies.map((movie: IMovie, index: number) => {
                return <MovieCard movie={movie} index={index} />;
              })}
            </div>
          </TransitionGroup>
          {movies.length == 0 && 
            <div className="flex justify-center">
              <div className="border p-2 border-st88-secondary text-st88-secondary">
                Фильмы не найдены
              </div>
            </div>}
          <div ref={lastElement} style={{ height: 10, background: "transperent" }} />
          {isMovieLoading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
        </div>
        <div className="lg:w-1/6 lg:order-2 color-test order-1 w-full mb-6">
          <FilterNav openNav={openNav} setOpenNav={setOpenNav} title="Фильмы"/>
          <Collapse open={openNav} className={`${openNav ? "overflow-visible z-0" : 'overflow-hidden'}`}>
            <MovieFilter defaultYeras={defaultYears}
                          sort={sort} setSort={setSort} 
                          search={search} setSearch={setSearch}
                          releaseYears={releaseYears} setReleaseYears={setReleaseYears}/>
            {[search, sort].some(item=>item) 
            && 
            <div className="flex justify-center items-center">
              <div className="lg:my-5 lg:mt-10 mt-4  cursor-pointer border-2 p-2 hover:bg-st88-secondary" onClick={resetFilter}>Сбросить</div>
            </div>
            }
          </Collapse>
        </div>
      </div>
    </>
  );
}
export default Movies;
