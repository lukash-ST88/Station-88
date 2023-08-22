import { useState, useEffect } from "react"
import { IMovie } from "../models"
import MovieService from "../services/movies"
import {Link} from 'react-router-dom'

function Movies (){
    const [movies, setMovies] = useState<IMovie[]>([])

    useEffect(()=>{
        retriveMovies();
        
      }, [])

    const retriveMovies = () => {
        MovieService.getAllMovies().then(response => setMovies(response.data)).catch(e => console.log(e))
    }
    

    return (
    <>
    <div></div>
    <div className="grid grid-cols-3 gap-4">
    
        {movies.map(movie => {
            return  (
                <Link to='#' className="flex flex-col items-between md:flex-row md:max-w-xl bg-gray-900 bg-opacity-80 hover:ring-4 hover:ring-green-600"> 
                    <img className="object-cover w-full h-96 md:h-auto md:w-48" src={movie.poster} alt={movie.title}/>
                    <div className="flex flex-col items-between p-5 leading-normal">
                        <h2 className="">{movie.title} </h2>
                        <p>{movie.original_title}</p>
                        <h4>{movie.year}</h4>
                        <h4>{movie.genre}</h4>
                        <h4>10</h4>
                    </div>
                    
                    {/* <div>{movie.title} </div>
                    <div>{movie.original_title} </div>
                    <div>{movie.url} </div>
                    <div>{movie.director} </div>
                    <img src={movie.poster}/>
                    <a href={movie.link}>{movie.link}</a>
                    <div>{movie.genre} </div> */}
                    {/* <div> {movie.ST88descriptions.map(desc=>(<div>{desc?.description} {desc?.author}</div>))}</div>
                    <div>{movie.comments.map(comment=>(<div>{comment?.text}</div>))}</div> */}
                </Link>
            )
      })} 
    
    <button onClick={()=> retriveMovies()}>get movies</button>
    </div>
    <div>filter</div>
    </>
    )
}
export default Movies