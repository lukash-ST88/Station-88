import { IUser } from "../../interfaces/UserInterfaces"
import { stringToArray } from "../../utils/covertion";

interface IUserTeamCardProps {
  user: IUser
}

const UserTeamCard = (props: IUserTeamCardProps) => {
  return (
    <div className="bg-gradient-to-b from-st88-background via-st88-third to-st88-background border-2 border-st88-main grid grid-cols-2 gap-2 p-4 h-[320px]">
        <div className="flex flex-col items-center justify-center gap-2">
            <img src={props.user.profile?.photo} alt={props.user.username} className="lg:w-[200px] w-[150px]"/>
            <div className="flex flex-col items-center justify-center border-t-2 text-xl lg:text-2xl">
                <div>{props.user.profile?.first_name}</div>
                <div>{props.user.profile?.last_name}</div>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center">
            {stringToArray(props.user.profile!.role).map((role: string, index: number) => (
                <div key={index} className="italic text-st88-main text-xl lg:text-2xl font-bold">{role}</div>
            ))}
        </div>

    </div>
  )
};
export default UserTeamCard;