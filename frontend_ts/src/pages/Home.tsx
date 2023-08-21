import React, {useState, useEffect} from 'react';
import { IMovie, IArticle } from '../models';
import MovieService from "../services/movies"
import ArticleService from "../services/articles"
import Navigation from '../components/containers/Navigation';
import { Routes, Route } from 'react-router-dom';



function Home() {
  
  

  return (
    <>
     <div>home page</div>
    </>
  );
}

export default Home;
