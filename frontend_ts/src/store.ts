import { combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import { signupReducer } from './components/auth/Signup/SignupReducer'
import { loginReducer } from './components/auth/Login/LoginReducer'
import { configureStore } from '@reduxjs/toolkit'
import { isEmpty } from './utils/isEmpty'
import { setToken, setCurrentUser } from './components/auth/Login/LiginActions'
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";

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
  store.dispatch(setToken(localStorage.getItem("token")));
}
if (!isEmpty(localStorage.getItem("user"))) {
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  store.dispatch(setCurrentUser(user, "/"));
}


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
 
