import { useState, useEffect } from "react"
import { IMovie } from "../models"
import MovieService from "../services/movies"

function Movies (){
    const [movies, setMovies] = useState<IMovie[]>([])

    useEffect(()=>{
        retriveMovies();
        
      }, [])

    const retriveMovies = () => {
        MovieService.getAllMovies().then(response => setMovies(response.data)).catch(e => console.log(e))
    }
    

    return (<>
    <div> 
        {movies.map(movie => {
            return  (
                <div> 
                    <div>{movie.title} </div>
                    <div>{movie.original_title} </div>
                    <div>{movie.url} </div>
                    <div>{movie.director} </div>
                    <img src={movie.poster}/>
                    <a href={movie.link}>{movie.link}</a>
                    <div>{movie.genre} </div>
                    <div> {movie.ST88descriptions.map(desc=>(<div>{desc?.description} {desc?.author}</div>))}</div>
                    <div>{movie.comments.map(comment=>(<div>{comment?.text}</div>))}</div>
        
                </div>
            )
      })} 
    </div>
    <button onClick={()=> retriveMovies()}>get movies</button>
    </>)
}
export default Movies