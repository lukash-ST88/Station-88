import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { IUser } from "../models";
import UserService from "../services/users";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import { logout } from "../components/auth/Login/LiginActions";
import { store } from "../store";
import { API_URL } from "../services/settings/urls";

const Profile = () => {
  const [user, setUser] = useState<IUser>()
  const params = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(params.username);
 
  }, []);
  const [fetchUser, isUserLoading, userError]: any = useFetching(
    async (username: string) => {
      const response = await UserService.getUserByUsername(username)
      setUser(response.data);
    }
  );

  function handleLogout() {
    store.dispatch(logout())
    navigate('/')
  }

  return (<>
  {isUserLoading 
  ? <Loader/> 
  :
  <div className="container flex">
   <div>{user?.username}</div>
   <div>{user?.profile?.first_name} {user?.profile?.last_name}</div>
   <img src={`${API_URL}${user?.profile?.avatar}`} className="w-20"/>
   <div><button className="bg-red-500 text-white rounded-sm text-sm" onClick={handleLogout}> Выйти</button></div>
  
  </div>
  }
  </>);
};

export default Profile;
