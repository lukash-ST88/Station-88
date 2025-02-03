import { IUser } from "../../interfaces/UserInterfaces";
import "../components/Accordion/Accordion.css"

interface IAuthorListProps {
    authors: IUser[] | undefined
    workTitle: string,
    workTitlePlural: string
}

const AuthorList = (props: IAuthorListProps) => {
    return(<>
    {props.authors &&
            <>
                {props.authors.length > 0 && 
                <>
                    <div className="lg:text-xl text-start py-2">
                        {props.authors.length > 1 ? 
                        <div className="container flex">
                            <div>{props.workTitlePlural}: &nbsp; </div>
                            <div>
                            {props.authors.map((author: IUser, index: number) => {
                                    return (
                                        <h1 key={index} className="">
                                        {author.profile?.last_name} {author.profile?.first_name}  
                                        </h1>
                                    );
                            })}
                            </div>
                        </div> : <div className="flex justify-start">
                            {props.workTitle}: &nbsp;
                            {props.authors.map((author: IUser, index: number) => {
                                    return (
                                        <h2 key={index}>
                                        {author.profile?.last_name} {author.profile?.first_name}  &nbsp; 
                                        </h2>
                                    );
                            })}
                        </div>} 
                    </div>
                </>}
            </>  }
    </>)
}
export default AuthorList;