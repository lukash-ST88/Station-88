import { useEffect, useState } from "react";
import { IUser } from "../interfaces/UserInterfaces";
import { useFetching } from "../hooks/useFetching";
import UserService from "../services/users";
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