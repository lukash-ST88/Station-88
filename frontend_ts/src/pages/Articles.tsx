import React, {useState, useEffect} from 'react';
import { IMovie, IArticle } from '../models';
import MovieService from "../services/movies"
import ArticleService from "../services/articles"
import Navigation from '../components/containers/Navigation';
import { Routes, Route } from 'react-router-dom';

function Articles (){

  const [articles, setArticles] = useState<IArticle[]>([])

  useEffect(()=>{
    retriveArticles();
  }, [])

  const retriveArticles = ()=> {
    ArticleService.getAllArticles().then(response => setArticles(response.data)).catch(e=>console.log(e))
  }

  return (
    <>
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

      <button onClick={()=> retriveArticles()}>get articles</button>
   </>)
}

export default Articles