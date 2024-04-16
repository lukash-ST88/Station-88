import axios from 'axios'
import { IBanners } from '../models';
import { API_URL } from './settings/urls';


class BannersService{
    getAllBanners(){
        const url = `${API_URL}/API/banners`
        return axios.get<IBanners[]>(url);  
   }
}

export default new BannersService();