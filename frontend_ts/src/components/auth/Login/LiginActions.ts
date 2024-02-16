import axios from "axios";
// import { push } from "react-router-redux";
import { toast } from "react-toastify";
import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./LoginTypes";
import { setAxiosAuthToken, toastOnError } from "../../../utils/authToken";
import { API_URL } from "../../../services/settings/urls";
import { history } from "../../../store";
// import { useNavigate } from "react-router";
// import { Redirect } from "react-router-dom"

export interface IUserData {
  username: string
  password: string
}

export const login = (userData: IUserData, redirectTo: string) => {
  // console.log(`login 0 - ${userData}`)
  return (dispatch: any) => {
    // console.log("login 1");
    axios
      .post(`${API_URL}/API/auth/token/login/`, userData)
      .then((response) => {
        const { auth_token } = response.data;
        // console.log(`login 2 - ${auth_token}`);
        setAxiosAuthToken(auth_token);
        dispatch(setToken(auth_token));
        dispatch(getCurrentUser(redirectTo));
      })
      .catch((error) => {
        dispatch(unsetCurrentUser());
        toastOnError(error);
      });
  };
};

export const getCurrentUser = (redirectTo: string) => (dispatch: any) => {
  // console.log("login 6 - get current user");
  axios
    .get(`${API_URL}/API/auth/users/me/`)
    .then((response) => {
      const user = {
        username: response.data.username,
        email: response.data.email,
      };
      // console.log(`login 7 - ${user.username}`)
      dispatch(setCurrentUser(user, redirectTo));
    })
    .catch((error) => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};

export const setCurrentUser = (user: any, redirectTo: string) => (dispatch: any) => {
  localStorage.setItem("user", JSON.stringify(user));
  dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
  // console.log("set user is over " + redirectTo);

  if (redirectTo !== "") {
    // console.log('redirect works')
    // dispatch(push(redirectTo));
    dispatch(history.push('/movies'))
   
  }
};

export const setToken = (token: any) => (dispatch: any) => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  // console.log(`login 4 - ${localStorage.getItem("token")}`);
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
  // console.log("login 5 - setToken is over");
};

export const  unsetCurrentUser = () => (dispatch: any) => {
  setAxiosAuthToken("");
  // console.log('in unsetCurrentUser')
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
      // console.log('in logout')
      dispatch(unsetCurrentUser());
      // store.dispatch(push("/"));
      toast.success("Logout successful.");
    })
    .catch((error) => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};
