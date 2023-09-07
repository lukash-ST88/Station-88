import { useState, useEffect } from "react"
import { IArticle, IMovie } from "../models"
import MovieService from "../services/movies"
import {Link} from 'react-router-dom'
import Filter from "../components/Filter/Filter"
import { usePosts } from "../hooks/usePosts"

export interface IFilter {
    sort: string,
    query: string
}

function Movies (){
    const [movies, setMovies] = useState<IMovie[]>([])
    const [filter, setFilter] = useState<IFilter>({
        sort: "", 
        query: ""
    })
    const sortedAndSearchedMovies: any = usePosts(movies, filter.sort, filter.query);
    
    useEffect(()=>{
        retrieveMovies();
        
      }, [])

    const retrieveMovies = () => {
        MovieService.getAllMovies().then(response => setMovies(response.data)).catch(e => console.log(e))
    }
    

    return (
    <>
    
    <div className="flex">
        <div className="w-5/6">
            <div className="grid grid-cols-3 gap-4">
                {sortedAndSearchedMovies.map((movie: IMovie) => {
                    return  (
                        <Link to='#' className="flex items-between md:flex-row md:max-w-xl border-custom bg-opacity-80 hover:ring-4 z-0 hover:z-10 hover:ring-green-600 hover:shadow-2xl transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 icons"> 
                            <img className="object-cover w-full h-96 md:h-auto md:w-48" src={movie.poster} alt={movie.title}/>
                            <div className="flex flex-col justify-around color-card items-center text-center p-5 leading-normal">
                                <div className="flex flex-col justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                </svg>
                                <div className="">{movie.title} </div>
                                <div className="italic text-sm">{movie.original_title}</div>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>{movie.year}</div>
                                </div>
                                <div className="flex flex-col justify-center items-center"  >
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                                <div>{movie.genre}</div> */}
                                </div>
                                <h4>CT 10 imdb 8.5 КП 8.4</h4>
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

                {/* <button onClick={()=> retriveMovies()}>get movies</button> */}
            </div>
        </div>
        {/* <button onClick={()=> console.log(sortedAndSearchedMovies.map(movie=> movie.original_title))}>bat</button> */}
        <div className="w-1/6 color-test "> 
            <Filter filter={filter} setFilter={setFilter} />
        </div>
    </div>
    </>

    )
}
export default Movies