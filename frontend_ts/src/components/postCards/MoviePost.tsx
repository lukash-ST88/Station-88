import { IMovieIndexProps } from "../cards/MovieCard"

const MoviePost = (props: IMovieIndexProps)=> {
    return(<div>
        <div style={{background: 'green'}}>{props.movie.title}</div>
    </div>)
}

export  default MoviePost