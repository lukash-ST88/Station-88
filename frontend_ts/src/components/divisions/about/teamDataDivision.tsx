import { RiTeamFill } from "react-icons/ri";
import { IUser } from "../../../interfaces/UserInterfaces";
import UserTeamCard from "../../cards/UserTeamCard";

interface ITeamDataDivisionProps {
    users: IUser[] | undefined
}

const TeamDataDivision = (props: ITeamDataDivisionProps) => {
    return (
        <>
            <div className="mt-10 items-center p-5 bg-gradient-to-r from-st88-background via-st88-main to-st88-background">
                <div className="flex justify-center items-center">
                    <div className="border-2 bg-st88-background p-3 text-center text-st88-main text-2xl border-st88-main flex flex-col items-center gap-2" >
                        <RiTeamFill className="text-4xl"/>
                        <div>
                            Наша Комнада
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 mt-5">
                    {props.users?.map((user: IUser, index: number)=><UserTeamCard user={user}/>)}
                </div>
            </div>
        </>
    )
};

export default TeamDataDivision;