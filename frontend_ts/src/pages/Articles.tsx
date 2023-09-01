import React, { useState, useEffect } from "react";
import { IMovie, IArticle } from "../models";
import MovieService from "../services/movies";
import ArticleService from "../services/articles";
import Navigation from "../components/containers/Navigation";
import { Routes, Route } from "react-router-dom";
import {Link} from 'react-router-dom'

function Articles() {
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    retriveArticles();
  }, []);

  const retriveArticles = () => {
    ArticleService.getAllArticles()
      .then((response) => setArticles(response.data))
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex">
      <div className="w-5/6">
        <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
          {articles.map((article) => {
            return (
              <Link to='#' className="relative border-custom hover:text-green-600 hover:ring-4 hover: ring-green-600 transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                {/* <div className="absolute text-on-image">
                  <div className="">{article.title}</div>
                  <div className="italic text-sm">{article.subtitle}</div>
                </div> */}
                {/* <div>{article.release_date}</div> */}
                <div className="text-center">{article.title}</div>
                <img
                  src={article.poster}
                  className="object-cover h-48 w-full"
                />
                <div className="text-center italic text-sm">{article.subtitle}</div>
                {/* <div dangerouslySetInnerHTML={{__html: article.content}}/> */}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Articles;
