import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import Article from "../pages/Article";
import Movie from "../pages/Movie";
import Movies from "../pages/Movies";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { Provider } from "react-redux";
import { store } from "../store";

const Router = () => {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:url" element={<Movie />} />
          <Route path="/article/:url" element={<Article />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes> 
      </Provider>
    </>
  );
};

export default Router;
