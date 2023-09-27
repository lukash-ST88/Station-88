import axios from "axios";
import { IMovie, IMovieRetrieve } from "../models";

export const API_URL = "http://localhost:8000";

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
