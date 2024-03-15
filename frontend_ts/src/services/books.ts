import axios from "axios";
import { IBook } from "../models";
import { API_URL } from "./settings/urls";


class BookService {
  getBookByUrl(slug: string) {
    const url = `${API_URL}/API/book/${slug}`;
    const response = axios.get<IBook>(url);
    return response;
  }
}

export default new BookService();