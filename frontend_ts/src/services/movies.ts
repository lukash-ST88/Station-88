import axios from 'axios'
import { IMovie } from '../models';

const API_URL = 'http://localhost:8000';

class MovieService{
    getAllMovies(){
        const url = `${API_URL}/API/movies`
        return axios.get<IMovie[]>(url);  
   }
}

export default new MovieService