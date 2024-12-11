import { IUser } from "../../../interfaces/UserInterfaces";
import { API_URL } from "../../../services/settings/urls";

interface IProfileDataDivisionProps {
    user: IUser
}

const profileDataDivision = (props: IProfileDataDivisionProps) => {
    return (
        <>
            <div className="flex justify-center gap-10 items-center p-5 bg-gradient-to-r from-st88-background via-st88-secondary to-st88-background">
              <div className="flex flex-col justify-center items-center gap-2 border-2 cursor-default bg-st88-background h-[320px] w-[240px]">
                <img src={`${API_URL}${props.user?.profile?.avatar}`} className="object-cover h-[320px]" alt={props.user?.username}/>
              </div>
              <div className="grid grid-cols-1 justify-center items-center gap-2 content-center border-2 px-16 cursor-default bg-st88-background min-h-[320px] min-w-[240px] text-center">
                
                  <div className="flex items-center">
                    <div className="profile-column-name-box">Ник профиля</div>
                    <div>{props.user?.username}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="profile-column-name-box">Имя </div>
                    <div >{props.user?.profile?.first_name} {props.user?.profile?.last_name}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="profile-column-name-box">Email </div>
                    <div >{props.user?.email}</div>
                  </div>
                  {props.user?.is_staff && 
                    <div className="flex items-center">
                      <div className="profile-column-name-box">Роль </div>
                      <div >{props.user?.profile?.role}</div>
                    </div>
                  }
              </div>
          </div>
        </>
    )
};

export default profileDataDivision;