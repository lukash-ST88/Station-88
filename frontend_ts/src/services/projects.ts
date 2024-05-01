import axios from "axios";
import { IProject, IProjectRetrieve } from "../interfaces/ProjectInterfaces";
import { API_URL } from "./settings/urls";


class ProjectService {
  getAllProjects(limit: number, offset: number) {
    const url = `${API_URL}/API/projects`;
    const response = axios.get<IProjectRetrieve>(url, {
      params: {
        limit: limit,
        offset: offset,
      },
    });
    return response;
  }
  getProjectByUrl(slug: string) {
    const url = `${API_URL}/API/project/${slug}`;
    const response = axios.get<IProject>(url);
    return response;
  }
}

export default new ProjectService();
