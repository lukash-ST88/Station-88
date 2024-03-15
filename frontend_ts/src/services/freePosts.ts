import axios from "axios";
import { IFreePost } from "../models";
import { API_URL } from "./settings/urls";


class FreePostService {
  getFreePostByUrl(slug: string) {
    const url = `${API_URL}/API/free-post/${slug}`;
    const response = axios.get<IFreePost>(url);
    return response;
  }
}

export default new FreePostService();