import axios from "axios";
import { toast } from "react-toastify";
import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./LoginTypes";
import { setAxiosAuthToken, toastOnError } from "../../../utils/authToken";
import { API_URL } from "../../../services/settings/urls";
import { history } from "../../../store";


export interface IUserData {
  username: string
  password: string
}

export const login = (userData: IUserData, redirectTo: string) => {
  return (dispatch: any) => {
    axios
      .post(`${API_URL}/API/auth/token/login/`, userData)
      .then((response) => {
        const { auth_token } = response.data;
        setAxiosAuthToken(auth_token);
        dispatch(setToken(auth_token));
        dispatch(getCurrentUser(redirectTo));
        toast.success("Вы успешно вошли в профиль");
      })
      .catch((error) => {
        dispatch(unsetCurrentUser());
        toast.error("Вы не вошли в профиль, вероято пароль или логин неверный", error);
      });
  };
};

export const getCurrentUser = (redirectTo: string) => (dispatch: any) => {
  axios
    .get(`${API_URL}/API/auth/users/me/`)
    .then((response) => {
      const user = {
        username: response.data.username,
        email: response.data.email,
      };
      dispatch(setCurrentUser(user, redirectTo));
    })
    .catch((error) => {
      dispatch(unsetCurrentUser());
      toast.error("Невозможно определить действующего пользователя", error);
    });
};

export const setCurrentUser = (user: any, redirectTo: string) => (dispatch: any) => {
  localStorage.setItem("user", JSON.stringify(user));
  dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });

  if (redirectTo !== "") {
    dispatch(history.push('/movies'))
   
  }
};

export const setToken = (token: any) => (dispatch: any) => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};

export const  unsetCurrentUser = () => (dispatch: any) => {
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: UNSET_CURRENT_USER,
  });
};

export const logout = () => (dispatch: any) => {
  axios
    .post(`${API_URL}/API/auth/token/logout/`)
    .then((response) => {
      dispatch(unsetCurrentUser());
      toast.success("Вы вышли из профиля");
    })
    .catch((error) => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};
