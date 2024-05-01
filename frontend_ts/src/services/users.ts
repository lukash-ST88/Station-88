import axios from "axios";
import { IUser}  from "../interfaces/UserInterfaces";
import { API_URL } from "./settings/urls";


class UserService {
  getUserByUsername(username: string) {
    const url = `${API_URL}/API/user/${username}`;
    const response = axios.get<IUser>(url);
    return response;
  }
}

export default new UserService();
