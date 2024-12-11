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
  getProjectsByUsername(username: string) {
    const url = `${API_URL}/API/projects/user/${username}`;
    const response = axios.get<IProjectRetrieve>(url);
    return response;
  }

  getProjectsByUsernameAndTitle(username: string, title: string){
    const url = `${API_URL}/API/projects/user/${username}/title/${title}`;
    const response = axios.get<IProjectRetrieve>(url);
    return response;
  }
}

export default new ProjectService();
