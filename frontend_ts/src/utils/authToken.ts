import axios from "axios";
import { toast } from "react-toastify";

export const setAxiosAuthToken = (token: string) => {
  if (typeof token !== "undefined" && token) {
    // Apply for every request
    // console.log('login 3 - axios default headeers')
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    // console.log(axios.defaults.headers.common["Authorization"])
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const toastOnError = (error: any) => {
  if (error.response) {
    // known error
    toast.error(JSON.stringify(error.response.data));
  } else if (error.message) {
    toast.error(JSON.stringify(error.message));
  } else {
    toast.error(JSON.stringify(error));
  }
};