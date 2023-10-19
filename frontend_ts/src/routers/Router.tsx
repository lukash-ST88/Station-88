import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import Article from "../pages/Article";
import Movie from "../pages/Movie";
import Movies from "../pages/Movies";
import Signup from "../pages/Signup";
import Login from "../pages/Login";


const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:url" element={<Movie />} />
        <Route path="/article/:url" element={<Article />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile" element={requireAuth(Profile)}/> */}
      </Routes>
    </>
  );
};

export default Router;
