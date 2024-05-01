import axios from "axios";
import { IMovie, IMovieRetrieve } from "../interfaces/MovieInterfaces";
import { API_URL } from "./settings/urls";


class MovieService {
  getAllMovies(limit: number, offset: number) {
    const url = `${API_URL}/API/movies`;
    const response = axios.get<IMovieRetrieve>(url, {
      params: {
        limit: limit,
        offset: offset,
      },
    });
    return response;
  }
  getMovieByUrl(slug: string) {
    const url = `${API_URL}/API/movie/${slug}`;
    const response = axios.get<IMovie>(url);
    return response;
  }
  getSortedMovies(limit: number, offset: number, sort: string){
    const url = `${API_URL}/API/movies/sort/${sort}`;
    const response = axios.get<IMovieRetrieve>(url, {
      params: {
        limit,
        offset,
      }
    }
    )
    return response;
  }
}

export default new MovieService();
