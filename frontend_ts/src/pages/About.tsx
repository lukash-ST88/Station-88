import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaVk } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { IUser } from "../interfaces/UserInterfaces";
import { useFetching } from "../hooks/useFetching";
import UserService from "../services/users";
import UserTeamCard from "../components/cards/UserTeamCard";
import { RiTeamFill } from "react-icons/ri";
import ContactsDataDivision from "../components/divisions/about/contactsDataDivision";
import TeamDataDivision from "../components/divisions/about/teamDataDivision";

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
            <ContactsDataDivision/>
            <TeamDataDivision users={users}/>
        </>
    )
};
export default About;