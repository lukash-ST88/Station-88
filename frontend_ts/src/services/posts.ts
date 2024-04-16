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
  }
}

export default new  PostService();
