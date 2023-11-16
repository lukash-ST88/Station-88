import { useState } from "react";
import { login } from "./LiginActions";
// import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import "../auth.css"
import { IUserData } from "./LiginActions";

interface ILoginAuth {
  login: (userdata: IUserData, redirectTo: string) => void;
  auth: any;
}

const LoginTag = (props: ILoginAuth) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = () => {
    const userData = {
      username: username,
      password: password,
    };
    props.login(userData, "/");
    console.log("login called");
  };
  return (
    <div className="w-full">
      <div> {props.auth.isAuthenticated ? 1 : 0} </div>
      <div className="text-center text-black main-text"> Вход </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          id="username"
          className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="username"
          className="peer-focus:font-medium absolute text-xl text-gray-500  duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Имя пользователя
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-xl text-gray-500 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Пароль
        </label>
      </div>
      <button
        onClick={onLoginClick}
        type="submit"
        className="text-green-500 bg-white border border-green-500 hover:bg-green-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Подтвердить
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(LoginTag);
// mapStateToProps just adds new state to props [props.auth]
// {login} - which is mapDispatchToProps - adds new dispatch to props [props.login() instead of props.dispatch(login()), or login()(dispatch))]
