import axios from "axios";
import { IArticle, IArticleRetrieve } from "../models";
import { API_URL } from "./settings/urls";


class ArticleService {
  getAllArticles(limit: number, offset: number = 0) {
    const url = `${API_URL}/API/articles`;
    const response = axios.get<IArticleRetrieve>(url, {
      params: {
        limit: limit,
        offset: offset,
      },
    });
    return response;
  }
  getArticleByUrl(slug: string) {
    const url = `${API_URL}/API/article/${slug}`;
    const response = axios.get<IArticle>(url);
    return response;
  }
}

export default new ArticleService();
