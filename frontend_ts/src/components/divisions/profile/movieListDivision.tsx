import { Input } from "@material-tailwind/react";
import { MdLocalMovies } from "react-icons/md";
import { IMovie } from "../../../interfaces/MovieInterfaces";
import { useNavigate } from "react-router-dom";


interface IMovieListDivisionProps {
    searchMovies: string
    setSearchMovies: Function
    movies: IMovie[] | undefined
}

const MovieListDivision = (props: IMovieListDivisionProps) => {
    const navigate = useNavigate();
    
    return (
        <>
            <div className="mt-10 flex justify-center gap-10 items-center p-5 bg-gradient-to-r from-st88-background via-st88-main to-st88-background text-center">
                <div className="flex flex-col justify-center items-center gap-2 border-2 px-5 cursor-default bg-st88-background min-h-[320px] min-w-[240px]">
                  <MdLocalMovies className="text-8xl"/>
                  <div className="border-t-2 text-2xl my-4 py-2">Фильмы</div>
                </div>
                <div className="flex flex-col justify-center items-center gap-5 border-2 px-5 cursor-default bg-st88-background h-[320px] w-[240px]">
                    <Input variant="standard" label="Поиск" placeholder="" 
                          value={props.searchMovies} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>props.setSearchMovies(event.target.value)}
                          className="text-st88-main " color="white"/>
                    <div className="flex flex-col border-2 h-[200px] w-[160px] overflow-y-scroll divide-y-2 divide-st88-main">
                      {props.movies?.map((movie: IMovie, index: number) =>
                        <div onClick={() => navigate(`/movie/${movie.url}`)} 
                          className="hover:bg-st88-main p-2 cursor-pointer" key={index}>
                          {movie.title}
                        </div>
                        )
                      } 
                    </div>
                </div>
              </div>   
        </>
    );
};
export default MovieListDivision;