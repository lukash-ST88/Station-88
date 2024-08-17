import { IProject } from "../../interfaces/ProjectInterfaces";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./cards.css" 

export interface IProjectIndexProps {
    project: IProject
    index: number
}

const ProjectCard = (props: IProjectIndexProps)=> {
    const navigate = useNavigate();
    return (<>
    
  <CSSTransition key={props.index} timeout={5000} classNames="post">
    <div
      onClick={() => navigate(`/project/${props.project.url}`)}
      className="grid grid-col-1 md:max-w-xl mx-2 border hover:lg:border-green-600 bg-opacity-80 hover:lg:ring-4 z-0 hover:cursor-pointer hover:z-10 hover:lg:ring-green-600 hover:lg:shadow-2xl transition duration-100 ease-in-out lg:transform hover:lg:-translate-y-1 hover:lg:scale-110 lg:icons"
    >
      <img
        className="object-cover justify-items-center w-full h-[360px] lg:h-[480px]"
        src={props.project.poster}
        alt={props.project.title}
      />
      <div className="color-card-project text-center lg:my-1">
        <div className="card-main-text md:text-2xl">
          <div className="">{props.project.title} </div>
        </div>
        <div className="card-main-text md:text-2xl">
          <div>{props.project.year}</div>
        </div>
      </div>
    </div>
  </CSSTransition>
  </>)
}

export default ProjectCard;
