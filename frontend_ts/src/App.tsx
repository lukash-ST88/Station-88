import React, {useState, useEffect} from 'react';
import { IMovie, IArticle } from './models';
import MovieService from "./services/movies"
import ArticleService from "./services/articles"
import Navigation from './components/containers/Navigation';
import { Routes, Route } from 'react-router-dom';
import Movies from './pages/Movies';
import Articles from './pages/Articles';
import Home from './pages/Home';

function App() {
  
  return (
    <div className="App">
      <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8'>
        <Navigation/>
      </div>
      <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8'> 
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/articles' element={<Articles/>}/>
        <Route path='/movies' element={<Movies/>}/>
      </Routes>
      </div>
      <div className='container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8 mt-10 border-t border-gray-100 dark:border-gray-800'>
        Container 3
      </div>
    </div>
  );
}

export default App;
