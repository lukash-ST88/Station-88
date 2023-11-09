import { IProjectIndexProps } from "../cards/ProjectCard";
import "./postCards.css";
import dateTime from "../../utils/dateTime";
import { useNavigate } from "react-router-dom";

const ProjectPost = (props: IProjectIndexProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="container grid grid-cols-16 m-5 border-2 hover:ring-4 z-0 hover:z-10 hover:text-black hover:bg-white hover:ring-white transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
        onClick={() => navigate(`/Project/${props.project.url}`)}
      >
        <div className="col-span-1 flex bg-white justify-center text-black items-center transform rotate-180">
          <div className="vertical">ПРОЕКТ СТАНЦИИ 88</div>
        </div>
        <img
          className="object-cover col-span-4 h-84 w-full "
          src={props.project.poster}
          alt={props.project.title}
        />
        <div className="col-span-10 justify-self-center self-center text-center divide-y-2">
          <div className="project-title-post">{props.project.title}</div>
          <div className="project-year">
            {props.project.year}
          </div>
        </div>
        <div className="col-span-1 flex bg-white justify-center text-black items-center">
          <div className="vertical">{dateTime(props.project.release_date)}</div>
        </div>
      </div>
    </>
  );
};

export default ProjectPost;
