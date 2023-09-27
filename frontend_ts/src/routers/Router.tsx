import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Articles from '../pages/Articles';
import Article from '../pages/Article';
import Movie from '../pages/Movie';
import Movies from '../pages/Movies';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:url" element={<Movie />} />
        <Route path="/article/:url" element={<Article />} />
      </Routes>
    </>
  );
};

export default Router