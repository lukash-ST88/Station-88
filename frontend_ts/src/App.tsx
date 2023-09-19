import React, {useState, useEffect} from 'react';
import { IMovie, IArticle } from './models';
import MovieService from "./services/movies"
import ArticleService from "./services/articles"
import Navigation from './components/containers/Navigation';
import { Routes, Route } from 'react-router-dom';
import Movies from './pages/Movies';
import Articles from './pages/Articles';
import Home from './pages/Home';
import SliderContainer from './components/containers/Slider/SliderContainer';
import Movie from './pages/Movie';


function App() {
  
  return (
    <div className="App container color-theme mx-auto my-0">
      <div className='container py-5 mx-auto '>
        <Navigation/>
      </div>
      <div className='container px-5 mx-auto '>
        <SliderContainer/>
      </div>
      <div className='container px-5 mx-auto xl:px-5 py-5 lg:py-8 '> 
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/articles' element={<Articles/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movie/:url' element={<Movie/>}/>
     </Routes>
      </div>
      <div className='container px-5 mx-auto xl:px-5 py-5 lg:py-8 mt-10 border-t border-gray-100 dark:border-gray-800'>
        Container 3
      </div>
    </div>
  );
}

export default App;
