import axios from "axios";
import { IArticle, IArticleRetrieve } from "../interfaces/ArticleInterfaces";
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
  };
  getArticleByUrl(slug: string) {
    const url = `${API_URL}/API/article/${slug}`;
    const response = axios.get<IArticle>(url);
    return response;
  };
  getSortedArticles(limit: number, offset: number, sort: string){
    const url = `${API_URL}/API/articles/sort/${sort}`;
    const response = axios.get<IArticleRetrieve>(url, {
      params: {
        limit,
        offset,
      }
    }
    )
    return response;
  }
  getFilteredArticles(limit: number, offset: number = 0, sort: string, category_slug: string, search_characters: string, start_date: Date | null = null, end_date: Date | null = null){
    const url = `${API_URL}/API/articles/filters`
    const response = axios.get<IArticleRetrieve>(url, {
      params: {
        limit,
        offset,
        sort,
        category_slug,
        search_characters,
        start_date,
        end_date
      }
    })
    return response;
  }
}

export default new ArticleService();
