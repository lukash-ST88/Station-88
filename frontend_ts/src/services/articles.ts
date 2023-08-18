import axios from 'axios'
import { IArticle } from '../models';

const API_URL = 'http://localhost:8000';

class ArticleService{
    getAllArticles(){
        const url = `${API_URL}/API/articles`
        return axios.get<IArticle[]>(url);  
   }
}

export default new ArticleService