import axios from 'axios'
import { IArticleRetrieve } from '../models';

const API_URL = 'http://localhost:8000';

class ArticleService{
    getAllArticles(limit: number, offset: number = 0){
        const url = `${API_URL}/API/articles`
        const response = axios.get<IArticleRetrieve>(url, {
            params: {
                limit: limit, 
                offset: offset,
              },
        });  
        return response
   }
}

export default new ArticleService