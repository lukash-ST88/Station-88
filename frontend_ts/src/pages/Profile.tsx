import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { IUser } from "../interfaces/UserInterfaces";
import UserService from "../services/users";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import { logout } from "../components/auth/Login/LiginActions";
import { store } from "../store";
import { API_URL } from "../services/settings/urls";
import "./pages.css"

const Profile = () => {
  const [user, setUser] = useState<IUser>();
  const params = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(params.username);
  }, []);
  const [fetchUser, isUserLoading, userError]: any = useFetching(
    async (username: string) => {
      const response = await UserService.getUserByUsername(username);
      setUser(response.data);
    }
  );

  function handleLogout() {
    store.dispatch(logout());
    navigate("/");
  }

  return (
    <>
      {isUserLoading ? (
        <Loader />
      ) : (
        <div className="container flex flex-wrap justify-between text-center">
          <img src={`${API_URL}${user?.profile?.avatar}`} className="profile-img rounded-2xl" alt={user?.username}/>
          <div className="flex flex-col justify-start items-start">
          <div className="flex items-center">
            <div className="rounded-md bg-green-500 m-2 p-2 w-32">Ник профиля</div>
            <div className="p-2 m-2">{user?.username}</div>
          </div>
          <div className="flex items-center">
            <div className="rounded-md bg-green-500 m-2 p-2 w-32">Имя </div>
            <div className="m-2 p-2">{user?.profile?.first_name} {user?.profile?.last_name}</div>
          </div>
          <div className="flex items-center">
            <div className="rounded-md bg-green-500 m-2 p-2 w-32">Email </div>
            <div className="m-2 p-2">{user?.email}</div>
          </div>
          <div className="flex items-center">
            <div className="rounded-md bg-green-500 m-2 p-2 w-32">Роль </div>
            <div className="m-2 p-2">{user?.profile?.role}</div>
          </div>
          </div> 
          <div className="flex flex-col">
            <button
              className="bg-red-500 rounded-md p-2 m-2 hover:bg-white hover:text-red-500 border border-4xl hover:border-red-500"
              onClick={handleLogout}
            >
              {" "}
              Выйти
            </button>
            <button className="p-2 m-2 bg-white text-black hover:bg-black hover:text-white border border-4xl border-white rounded-md" onClick={() => navigate("/admin/")}>Администрировать сайт</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
