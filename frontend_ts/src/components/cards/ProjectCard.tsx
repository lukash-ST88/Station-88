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
    
    return (
      <CSSTransition key={props.index} timeout={5000} classNames="post">
        <div onClick={() => navigate(`/project/${props.project.url}`)} className="project-card-container lg:icons">
          <img className="project-card-image" src={props.project.poster} alt={props.project.title}/>
          <div className="text-center lg:my-1">
            <h2 className="project-card-title">
              <div className="">{props.project.title} </div>
            </h2>
            <div className="lg:text-xl md:block hidden">
              <div>{props.project.year}</div>
            </div>
          </div>
        </div>
      </CSSTransition>
    )
}

export default ProjectCard;
