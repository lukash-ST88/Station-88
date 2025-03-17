import { IProjectIndexProps } from "../cards/ProjectCard";
import "./postCards.css";
import dateTime from "../../utils/dateTime";
import { useNavigate } from "react-router-dom";
import { YearRepresentation } from "../../utils/dataRepresentation";

const ProjectPost = (props: IProjectIndexProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="post-container"
        onClick={() => navigate(`/Project/${props.project.url}`)}
      >
        <div className="project-post-name">
          <div className="vertical">ПРОЕКТ СТАНЦИИ 88</div>
        </div>
        <img className="post-image" src={props.project.poster} alt={props.project.title}/>
        <div className="col-span-10 justify-self-center self-center text-center">
          <h2 className="flex justify-center"><div className="post-type-fixed">Проект</div></h2>
          <h3 className="project-post-title border-b-2">
            {props.project.title}
          </h3>
          <div className="project-post-year">
            {YearRepresentation(props.project.year, props.project.end_year)}
          </div>
        </div>
        <div className="post-date">
          <div className="vertical flex divide-y-2 gap-1">{dateTime(props.project.release_date).map((dateItem: string)=><div className="pt-1">{dateItem}</div>)}</div>
        </div>
      </div>
    </>
  );
};

export default ProjectPost;
