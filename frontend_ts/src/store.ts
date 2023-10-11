import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { routerReducer } from 'react-router-redux'
import { signupReducer } from './components/auth/Signup/SignupReducer'
import { loginReducer } from './components/auth/Login/LoginReducer'
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit'
import { isEmpty } from './utils/isEmpty'
import { setToken, setCurrentUser } from './components/auth/Login/LiginActions'



const createRootReducer = combineReducers({
  router: routerReducer,
  createUser: signupReducer,
  auth: loginReducer 
})

export const store = configureStore({
   reducer: createRootReducer
})
   
if (!isEmpty(localStorage.getItem("token"))) {
  store.dispatch(setToken(localStorage.getItem("token")));
}
if (!isEmpty(localStorage.getItem("user"))) {
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  store.dispatch(setCurrentUser(user, "/"));
}
 
