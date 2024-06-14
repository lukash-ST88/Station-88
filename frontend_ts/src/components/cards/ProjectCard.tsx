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
      className="grid grid-col-1 md:max-w-xl border-custom bg-opacity-80  hover:ring-4 z-0 hover:cursor-pointer hover:z-10 hover:ring-green-600 hover:shadow-2xl transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 icons"
    >
      <img
        className="object-cover justify-items-center w-auto h-full "
        src={props.project.poster}
        alt={props.project.title}
      />
      <div className="color-card-project  text-center">
        <div className="title-project">
          <div className="">{props.project.title} </div>
        </div>
        <div className="title-project">
          <div>{props.project.year}</div>
        </div>
      </div>
    </div>
  </CSSTransition>
  </>)
}

export default ProjectCard;
