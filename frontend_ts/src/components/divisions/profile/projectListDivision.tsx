import { Input } from "@material-tailwind/react";
import { IProject } from "../../../interfaces/ProjectInterfaces";
import { useNavigate } from "react-router-dom";
import { PiFilmSlateDuotone } from "react-icons/pi";


interface IProjectsListDivisionProps {
    searchProjects: string
    setSearchProjects: Function
    projects: IProject[] | undefined
}

const ProjectListDivision = (props: IProjectsListDivisionProps)=>{
    const navigate = useNavigate();

    return (
        <>
             <div className="mt-10 flex flex-wrap justify-center gap-10 items-center p-5 bg-gradient-to-r from-st88-background via-st88-main to-st88-background text-center">
              <div className="hidden lg:flex flex-col justify-center items-center gap-2 border-2 px-5 cursor-default bg-gradient-to-b from-st88-background via-st88-third to-st88-background lg:h-[320px] w-[240px]">
                <PiFilmSlateDuotone className="text-8xl"/>
                <div className="border-t-2 text-2xl my-4 py-2">Проекты</div>
              </div>
              <div className="flex flex-col justify-center items-center gap-5 border-2 px-5 cursor-default bg-gradient-to-b from-st88-background via-st88-third to-st88-background h-[320px] w-[240px]">
                <div className="block lg:hidden text-xl m-2 border-b-2 text-st88-main border-st88-main px-2">Проекты</div>
                <Input variant="standard" label="Поиск" placeholder="" 
                        value={props.searchProjects} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>props.setSearchProjects(event.target.value)}
                        className="text-st88-main " color="white"/>
                <div className="flex flex-col border-2 lg:h-[200px] h-[150px] w-[160px] overflow-y-scroll  divide-st88-main bg-gradient-to-b from-st88-background via-st88-main to-st88-background">
                {props.projects?.map((project: IProject, index: number) =>
                    <div onClick={() => navigate(`/project/${project.url}`)} 
                        className="hover:bg-st88-main p-2 cursor-pointer">
                        {project.title}
                    </div>
                    )
                } 
                </div>
              </div>
              
            </div>
        </>
    )
};

export default ProjectListDivision;