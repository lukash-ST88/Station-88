import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_USER_ERROR,
  CREATE_USER_SUBMITTED,
  CREATE_USER_SUCCESS
} from "./SignupTypes";
import { API_URL } from "../../../services/settings/urls";
import { store } from "../../../store";
import { IUserData } from "../Login/LiginActions";

export const signupNewUser = (userData: IUserData) => {
  store.dispatch({ type: CREATE_USER_SUBMITTED })
  axios
    .post(`${API_URL}/API/auth/users/`, userData)
    .then(response => {
      toast.success(
        "Аккаунт для " + userData.username +" создан"
      );
      store.dispatch({ type: CREATE_USER_SUCCESS });
      console.log('success')
    })
    .catch(error => {
      if (error.resposne) {
        toast.error(JSON.stringify(error.response.data));
        store.dispatch({
          type: CREATE_USER_ERROR,
          errorData: error.response.data
        });
        console.log('error 1')
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
        console.log('error 2')
      } else {
        toast.error(JSON.stringify(error));
        console.log('error 3')
      }
    });
};