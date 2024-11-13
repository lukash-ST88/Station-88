import axios from "axios";
import { API_URL } from "./settings/urls";

class PostService {
  getAllPosts(limit: number, offset: number) {
    const url = `${API_URL}/API/posts`;
    const response = axios.get<any>(url, {
      params: {
        limit: limit,
        offset: offset,
      },
    });
    return response;
  };
  getFilteredPosts(limit: number, offset: number = 0, category: string, search_characters: string, start_date: Date | null = null, end_date: Date | null = null){
    const url = `${API_URL}/API/posts/filters`
    const response = axios.get<any>(url, {
      params: {
        limit,
        offset,
        category,
        search_characters,
        start_date,
        end_date
      }
    })
    return response;
  }
}

export default new  PostService();
