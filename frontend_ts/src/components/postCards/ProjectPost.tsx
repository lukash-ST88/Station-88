import { IProjectIndexProps } from "../cards/ProjectCard";
import "./postCards.css";
import dateTime from "../../utils/dateTime";
import { useNavigate } from "react-router-dom";

const ProjectPost = (props: IProjectIndexProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="container grid grid-cols-16 my-3 lg:my-5 border-2 hover:ring-4 z-0 hover:z-10 hover:text-black hover:bg-white hover:ring-white transition duration-100 ease-in-out transform hover:lg:-translate-y-1 hover:lg:scale-110 hover:cursor-pointer"
        onClick={() => navigate(`/Project/${props.project.url}`)}
      >
        <div className="col-span-1 flex bg-white justify-center text-black items-center transform rotate-180 text-[10px] lg:text-sm p-2 lg:p-4">
          <div className="vertical">ПРОЕКТ СТАНЦИИ 88</div>
        </div>
        <img
          className="object-cover col-span-4 h-84 w-auto"
          src={props.project.poster}
          alt={props.project.title}
        />
        <div className="col-span-10 justify-self-center self-center text-center divide-y-2">
          <div className="flex justify-center"><div className="fixed top-0 bg-white text-black p-1 text-[8px] lg:text-base">Проект</div></div>
          <div className="project-title-post text-2xl lg:text-5xl">{props.project.title}</div>
          <div className="project-year text-lg lg:text-3xl pt-1 lg:pt-2">
            {props.project.year}
          </div>
        </div>
        <div className="col-span-1 flex bg-white justify-center text-black items-center text-[8px] lg:text-sm p-2 lg:p-4">
          <div className="vertical">{dateTime(props.project.release_date)}</div>
        </div>
      </div>
    </>
  );
};

export default ProjectPost;
