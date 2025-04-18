import { combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import { signupReducer } from './components/auth/Signup/SignupReducer'
import { loginReducer } from './components/auth/Login/LoginReducer'
import { configureStore } from '@reduxjs/toolkit'
import { isEmpty } from './utils/isEmpty'
import { setToken, setCurrentUser, unsetCurrentUser } from './components/auth/Login/LiginActions'
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import axios from 'axios'
import { toast } from 'react-toastify'

const {
  createReduxHistory,
  // routerMiddleware,
  // routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

const createRootReducer = combineReducers({
  router: routerReducer,
  createUser: signupReducer,
  auth: loginReducer 
})

export const store = configureStore({
   reducer: createRootReducer,
  //  middleware: [routerMiddleware]
})

export const history = createReduxHistory(store);
   
if (!isEmpty(localStorage.getItem("token"))) {
  setTimeout(()=>{
    store.dispatch(setToken(localStorage.getItem("token")));
  }, 700)
}

if (!isEmpty(localStorage.getItem("user"))) {
  setTimeout(()=>{
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    store.dispatch(setCurrentUser(user, "/"));
  }, 700)
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(unsetCurrentUser());
      toast.error("Ваш токен истек, пожалуйста, зайдите в профиль заново", {
        toastId: "token-expired"
      });
      store.dispatch(history.push('/'));
    }
    return Promise.reject(error);
  }
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
 
