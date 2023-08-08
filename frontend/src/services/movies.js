import axios from 'axios'

const API_URL = 'http://localhost:4000';

class MovieService{
    constructor(){}
    getAllMovies(){
        const url = `${API_URL}/API/movies`
        return axios.get(url);  
   }
}

export default new MovieService
