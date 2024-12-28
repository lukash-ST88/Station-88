import axios from 'axios'
import { ISlider } from '../interfaces/Interfaces';
import { API_URL } from './settings/urls';


class SlidersService {

    static getAllSliders(){
        const url = `${API_URL}/API/sliders`
        return axios.get<ISlider[]>(url);  
    }
    
}

export default SlidersService;