import axios from 'axios'
import { IMovie, IMovieRetrieve } from '../models';

const API_URL = 'http://localhost:8000';

class MovieService{
    getAllMovies(limit: number, offset: number = 0){
        const url = `${API_URL}/API/movies`
        const response = axios.get<IMovieRetrieve>(url, {
            params: {
              limit: limit, 
              offset: offset,
            },
          })
        return response;  
   }
}

export default new MovieService