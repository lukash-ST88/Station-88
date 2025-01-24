import { IUser } from "../../../interfaces/UserInterfaces";
import { API_URL } from "../../../services/settings/urls";

interface IProfileDataDivisionProps {
    user: IUser
}

const profileDataDivision = (props: IProfileDataDivisionProps) => {
    return (
        <>
            <div className="flex flex-wrap justify-center gap-10 items-center p-5 bg-gradient-to-r from-st88-background via-st88-secondary to-st88-background">
              {props.user?.profile?.avatar &&
                <div className="flex flex-col justify-center items-center gap-2 border-2 cursor-default bg-st88-background lg:h-[320px] lg:w-[240px] w-[160px] h-[240px]">
                  <img src={`${API_URL}${props.user?.profile?.avatar}`} className="object-cover h-[320px] " alt={props.user?.username}/>
                </div>
              }
              <div className="grid grid-cols-1 justify-center items-center gap-2 content-center border-2 py-3 px-6 lg:px-16 cursor-default bg-gradient-to-b from-st88-background via-st88-third to-st88-background lg:min-h-[320px] lg:min-w-[240px] text-center">
                  {!props.user?.profile?.last_name && 
                    <div className="border-2 p-2 border-st88-secondary text-st88-secondary">
                      Профиль проходит модерацию
                    </div>
                  }
                  <div className="flex justify-center lg:justify-start items-center flex-wrap">
                    <div className="profile-column-name-box">Ник профиля</div>
                    <div className="">{props.user?.username}</div>
                  </div>
                  {props.user?.profile?.first_name &&
                  <div className="flex justify-center lg:justify-start items-center flex-wrap">
                    <div className="profile-column-name-box">Имя </div>
                    <div >{props.user?.profile?.first_name} {props.user?.profile?.last_name}</div>
                  </div>
                  }
                  {props.user?.email &&
                    <div className="flex justify-center lg:justify-start items-center flex-wrap">
                       <div className="profile-column-name-box">Email </div>
                       <div >{props.user?.email}</div>
                    </div>
                  }
                  {props.user?.is_staff && 
                    <div className="flex justify-center lg:justify-start items-center flex-wrap">
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