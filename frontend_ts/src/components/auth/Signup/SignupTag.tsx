import { useState } from "react";
import { signupNewUser } from "./SignupActions";
import { useNavigate } from "react-router-dom";
import "../auth.css"
import { API_URL } from "../../../services/settings/urls";

const SignupTag = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSignupClick = () => {
    const userData = {
      username: username,
      password: password,
    };
    
    signupNewUser(userData);
    console.log(userData.username, userData.password);
    // navigate(`${API_URL}/login`)
  };

  return (
    <div>
      <div>
        <div className="text-center text-black main-text ">Регистрация</div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="username"
            id="username"
            className="block py-2.5 px-0 w-full text-xl text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-500 peer"
            placeholder=" "
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor="username"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Ник пользователя
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-500 peer"
            placeholder=" "

            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-xl text-gray-500  duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Пароль
          </label>
        </div>
        <button
          type="submit"
          onClick={onSignupClick}
          className="text-red-500 bg-white border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
         Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default SignupTag;
