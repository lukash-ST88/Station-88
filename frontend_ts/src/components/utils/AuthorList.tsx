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
                    <div className="text-xl text-start py-2 accordion-description-text">
                        {props.authors.length > 1 ? 
                        <div className="container flex">
                            <div>{props.workTitlePlural}: &nbsp; </div>
                            <div>
                            {props.authors.map((author: IUser, index: number) => {
                                    return (
                                        <div key={index} className="">
                                        {author.profile?.last_name} {author.profile?.first_name}  
                                        </div>
                                    );
                            })}
                            </div>
                        </div> : <>
                            {props.workTitle}: &nbsp;
                            {props.authors.map((author: IUser, index: number) => {
                                    return (
                                        <span key={index}>
                                        {author.profile?.last_name} {author.profile?.first_name}  &nbsp; 
                                        </span>
                                    );
                            })}
                        </>} 
                    </div>
                </>}
            </>  }
    </>)
}
export default AuthorList;