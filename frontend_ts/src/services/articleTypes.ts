import axios from "axios";
import { IArticleTypeRetrieve } from "../interfaces/ArticleInterfaces";
import { API_URL } from "./settings/urls";


class ArticleTypeService {
  getAllArticleTypes() {
    const url = `${API_URL}/API/article-types`;
    const response = axios.get<IArticleTypeRetrieve>(url);
    return response;
  }
}

export default new ArticleTypeService();
