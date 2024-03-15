import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import Article from "../pages/Article";
import Movie from "../pages/Movie";
import Movies from "../pages/Movies";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Projects from "../pages/Projects";
import Project from "../pages/Project";
import Profile from "../pages/Profile";
import Book from "../pages/Book";
import FreePost from "../pages/FreePost";


const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>      
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:url" element={<Article />}/>
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:url" element={<Movie />} />
        <Route path="/book/:url" element={<Book />}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/project/:url" element={<Project/>}/>
        <Route path="/free-post/:url" element={<FreePost/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </>
  );
};

export default Router;
