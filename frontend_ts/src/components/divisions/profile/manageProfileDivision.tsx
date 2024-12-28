
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../interfaces/UserInterfaces";
import { store } from "../../../store";
import { logout } from "../../auth/Login/LiginActions";

interface IManageProfileDivisionProps{
    user: IUser | undefined

}

const ManageProfileDivision = (props: IManageProfileDivisionProps) =>{
    const navigate = useNavigate();

    function handleLogout() {
        store.dispatch(logout());
        navigate("/");
      }
    return (
        <>
            <div className="mt-10 flex flex-wrap justify-center lg:gap-10 items-center p-5 bg-gradient-to-r from-st88-background via-white to-st88-background text-center">
              {props.user?.is_staff &&
                <div className="p-2 m-2 bg-st88-main hover:bg-white hover:text-st88-main border-2 cursor-pointer w-[250px]" 
                  onClick={() => window.location.replace('https://station88.ru/admin/')}> 
                    Администрировать сайт
                </div>
              }
              <div onClick={handleLogout}
                className="p-2 m-2 bg-st88-secondary hover:bg-white hover:text-st88-secondary border-2 cursor-pointer w-[250px]">
                  Выйти
              </div>
            </div>
        </>
    )
};
export default ManageProfileDivision;