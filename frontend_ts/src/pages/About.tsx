import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaVk } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { IUser } from "../interfaces/UserInterfaces";
import { useFetching } from "../hooks/useFetching";
import UserService from "../services/users";
import UserTeamCard from "../components/cards/UserTeamCard";
import { RiTeamFill } from "react-icons/ri";

const About = () => {
    const [users, setUsers] = useState<IUser[]>([]);


    useEffect(()=>{
        fetchUsers();
    }, [])

    const [fetchUsers, isUserLoading, UserError]: any = useFetching(
        async () =>{
            const response = await UserService.getTeamUsers();
            setUsers(response.data);
        }
    )
    return (
        <>
            <div className="flex justify-center gap-10 items-center p-5 bg-gradient-to-r from-st88-background via-white to-st88-background">
                <div className="flex flex-col justify-center items-center gap-2 border-2 px-5 cursor-default bg-st88-background min-h-[320px] min-w-[240px]">
                    <BsFillStarFill className="text-8xl"/>
                    <div className="border-t-2  text-2xl my-4 py-2">Контакты</div>
                </div>
                <div className="grid grid-cols-1 justify-center items-center gap-2 content-center border-2 px-16 cursor-default bg-st88-background min-h-[320px] min-w-[240px]">
                        <div className="flex justify-around items-center gap-2">
                            <a href="https://vk.com/stazione_88"><FaVk className="text-6xl hover:text-blue-500 cursor-pointer"/></a>
                            <a  href="https://www.youtube.com/@station-88?si=kAq9Yg5Jcf-zm7e_"><TfiYoutube className="text-6xl hover:text-red-500 cursor-pointer"/></a>
                        </div>
                        <div className="border-t-2 my-4 py-2">
                            <div className="text-2xl">station88.rg@gmail.com</div>
                        </div>
                    </div>
            </div>
            
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
                       {users?.map((user: IUser, index: number)=><UserTeamCard user={user}/>)}
                    </div>
                </div>
            
        </>
    )
};
export default About;