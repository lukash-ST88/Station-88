import { useState } from "react";
import { login } from "./LiginActions";
// import { withRouter } from "react-router-dom";  
import { connect, useDispatch } from "react-redux";  

const LoginTag = (props: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const onLoginClick = () => {
        const userData = {
            username: username,
            password: password
        }
        props.login(userData, '/') 
        console.log('login called')
    }
    return ( <div>
        <div> {props.auth.isAuthenticated ? 1 : 0 } </div>
        <div className="relative z-0 w-full mb-6 group">
            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="username" className="peer-focus:font-medium absolute text-xl text-white dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">username</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-xl text-white dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
        </div>
        <button onClick={onLoginClick} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </div>)
};

const mapStateToProps = (state: any) => ({
    auth: state.auth
  });


export default connect(mapStateToProps, {login})(LoginTag);   
// mapStateToProps just adds new state to props [props.auth]
// {login} - which is mapDispatchToProps - adds new dispatch to props [props.login() instead of props.dispatch(login()), or login()(dispatch))]
