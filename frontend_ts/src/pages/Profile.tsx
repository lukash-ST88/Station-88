import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { IUser } from "../models";
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
          <div>
            <div className="rounded-md bg-green-500 mb-2 p-2">Ник профиля</div>
            <div>{user?.username}</div>
          </div>
          <div>
            <div className="rounded-md bg-green-500 mb-2 p-2">Имя </div>
            <div>{user?.profile?.first_name} {user?.profile?.last_name}</div>
          </div>
          <div>
            <button
              className="bg-red-500 rounded-md p-2"
              onClick={handleLogout}
            >
              {" "}
              Выйти
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
