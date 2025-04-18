import { IUser } from "../../interfaces/UserInterfaces"
import { stringToArray } from "../../utils/covertion";
import { FaVk } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

interface IUserTeamCardProps {
  user: IUser
}

const UserTeamCard = (props: IUserTeamCardProps) => {
  console.log(props.user)
  return (
    <div className="relative bg-gradient-to-b from-st88-background via-st88-third to-st88-background border-2 border-st88-main grid lg:grid-cols-2 gap-2 p-4 lg:h-[320px] min-h-[280px] grid-cols-1 lg:w-[400px] w-[240px]">
        <div className="flex flex-col items-center justify-center gap-2">
            <img src={props.user.profile?.photo} alt={props.user.username} className="lg:max-w-[200px] max-w-[120px] lg:max-h-[200px] max-h-[135px]"/>
            <div className="flex flex-col items-center justify-center border-t-2 text-base lg:text-2xl">
                <div>{props.user.profile?.first_name}</div>
                <div>{props.user.profile?.last_name}</div>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          {props.user.profile?.role && 
            stringToArray(props.user.profile?.role).map((role: string, index: number) => (
              <div key={index} className={`italic text-st88-main text-base ${role.length > 12 ? "lg:text-base":"lg:text-2xl"} font-bold`}>{role}</div>
            ))
          }
        </div>
        <div className="absolute right-2 top-2 flex justify-end items-center gap-2">
            {props.user?.profile?.vk_link && <a href={props.user.profile.vk_link}><FaVk className="text-xl lg:text-2xl lg:hover:text-blue-700 cursor-pointer"/></a>}
            {props.user?.profile?.instagram_link && <a href={props.user.profile.instagram_link}><RiInstagramFill className="text-xl lg:text-2xl lg:hover:text-pink-600 cursor-pointer"/></a>}
            {props.user.profile?.telegram_link && <a href={props.user?.profile?.telegram_link}><FaTelegram className="text-xl lg:text-2xl lg:hover:text-blue-300 cursor-pointer"/></a>}
        </div>
    </div>
  )
};
export default UserTeamCard;