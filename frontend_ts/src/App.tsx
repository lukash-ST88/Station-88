import React, {useState, useEffect} from 'react';
import { IMovie, IArticle } from './models';
import MovieService from "./services/movies"
import ArticleService from "./services/articles"
import Navigation from './components/containers/Navigation';


function App() {
  
  const [movies, setMovies] = useState<IMovie[]>([])
  const [articles, setArticles] = useState<IArticle[]>([])

  useEffect(()=>{
    retriveMovies();
    retriveArticles();
  }, [])

  const retriveMovies = () => {
    MovieService.getAllMovies().then(response => setMovies(response.data)).catch(e => console.log(e))
  }
  const retriveArticles = ()=> {
    ArticleService.getAllArticles().then(response => setArticles(response.data)).catch(e=>console.log(e))
  }

  return (
    <div className="App">

      <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8'>
        <Navigation/>
      </div>
      <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8'> Container 2</div>
      <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8 mt-10 border-t border-gray-100 dark:border-gray-800'>
        Container 3
      </div>
      <div>movies</div>
      <div> {movies.map(movie => {
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
        
       </div>)
      })} </div>
      <div>Articles</div>
      <div>{articles.map(article=>{
        return (<div>
          <div>{article.title}</div>
          <div>{article.release_date}</div>
          <img src={article.poster}/>
          -----------------------------
          <div dangerouslySetInnerHTML={{__html: article.content}}/>
        </div>)
      })}</div>
      <div className="text-3xl font-bold underline"> I am react TS</div>
      <button onClick={()=> retriveMovies()}>get movies</button>
      <button onClick={()=> retriveArticles()}>get articles</button>
      <button onClick={()=> console.log(movies)}> </button>
    </div>
  );
}

export default App;
