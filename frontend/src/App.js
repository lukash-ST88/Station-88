import MovieService from "./services/movies";
import {useState, useEffect} from 'react'
import axios from "axios";
import React from "react";

function App() {
  const [movies, setMovies] = useState([])
  
  useEffect(()=>{
    retriveMovies()
    console.log('get it')
    console.log(movies)
  }, [])

  const retriveMovies = ()=>{
    MovieService.getAllMovies().then(response => setMovies(response.data)).catch(e => console.log(e))
  }

  const getMovies = ()=>{
    axios.get('http://localhost:4000/API/movies').then(data => setMovies(data.data))
}

  return (
    <div className="App">
      <div> {movies.map(movie => {
       return  (<div> {movie.title} </div>)
      })} </div>
      <div> I am react</div>
      <button onClick={()=> retriveMovies()}></button>
      <button onClick={()=> console.log(movies)}> </button>
    </div>
  );
}

// class App extends React.Component {
//   render()
// }

export default App;
