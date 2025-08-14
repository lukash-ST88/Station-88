import { IUser } from "../../interfaces/UserInterfaces";
import "../components/Accordion/Accordion.css"

interface IAuthorListProps {
    authors: IUser[] | undefined
    outerAuthors: string[] | undefined
    workTitle: string,
    workTitlePlural: string
}

const AuthorList = (props: IAuthorListProps) => {
    const isAuthors: boolean = Boolean(props.authors && props.authors.length > 0) || Boolean(props.outerAuthors && props.outerAuthors.length > 0) 

    const isAuthorsPlural: boolean = ( (props.authors ? props.authors.length : 0)  +  (props.outerAuthors ? props.outerAuthors.length : 0) ) > 1

    return(<>
    {isAuthors &&
        <>
            <div className="lg:text-xl text-start py-2">
                {isAuthorsPlural 
                    ? 
                        <div className="container flex">
                            <div>{props.workTitlePlural}: &nbsp; </div>
                            <div>
                            {props.authors?.map((author: IUser, index: number) => {
                                    return (
                                        <h1 key={index} className="">
                                        {author.profile?.last_name} {author.profile?.first_name}  
                                        </h1>
                                    );
                            })}
                            {props.outerAuthors?.map((author: string, index: number) => {
                                    return (
                                        <h1 key={index} className="">
                                            {author}  
                                        </h1>
                                    );
                            })}
                            </div>
                        </div> 
                    : 
                        <div className="flex justify-start">
                            {props.workTitle}: &nbsp;
                            {props.authors?.map((author: IUser, index: number) => {
                                    return (
                                        <h2 key={index}>
                                        {author.profile?.last_name} {author.profile?.first_name}  &nbsp; 
                                        </h2>
                                    );
                            })}
                            {props.outerAuthors?.map((author: string, index: number) => {
                                    return (
                                        <h2 key={index}>
                                            {author}  &nbsp; 
                                        </h2>
                                    );
                            })}
                        </div>
                } 
            </div>
        </>  }
    </>)
}
export default AuthorList;