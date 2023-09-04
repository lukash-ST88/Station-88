import axios from 'axios'
import { IBanners } from '../models';

const API_URL = 'http://localhost:8000';

class BannersService{
    getAllBanners(){
        const url = `${API_URL}/API/banners`
        return axios.get<IBanners[]>(url);  
   }
}

export default new BannersService