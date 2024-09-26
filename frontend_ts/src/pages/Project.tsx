import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProject } from "../interfaces/ProjectInterfaces";
import Loader from "../components/components/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import ProjectService from "../services/projects";
import { API_URL } from "../services/settings/urls";
import AccordionTeam from "../components/components/Accordion/AccordionTeam";
import "../components/components/Accordion/Accordion.css";
import AccordionLinks from "../components/components/Accordion/AccordionLinks";
import GenreIcon from "../components/icons/GenreIcon";
import TimeIcon from "../components/icons/TimeIcon";
import DurationIcon from "../components/icons/DurationIcon";
import SynopsysIcon from "../components/icons/SynopsisIcon";
import ScenarioIcon from "../components/icons/ScenarioIcon";
import MovieIcon from "../components/icons/MovieIcon";
import TrailerIcon from "../components/icons/TrailerIcon";
import AccordionSynopsis from "../components/components/Accordion/AccordionSynopsis";
import AccordionSources from "../components/components/Accordion/AccordionSources";

const Project = () => {
  const [project, setproject] = useState<IProject>();
  const params = useParams();
  

  useEffect(() => {
    fetchProject(params.url);
    console.log(project?.scenario?.text);
  }, []);

  const [fetchProject, isProjectLoading, ProjectError]: any = useFetching(
    async (url: string) => {
      const response = await ProjectService.getProjectByUrl(url);
      setproject(response.data);
    }
  );

  return (
    <>
      {isProjectLoading 
      ? (
        <Loader />
      ) 
      : (
        <div>
          <div className="project-title-container">
            <div className="p-5 movie-title ">{project?.title}</div>
          </div>
          <div className="container lg:flex ">
            <div className="lg:w-1/3 lg:flex flex-col justify-start mt-4 divide-y-2 md:grid grid-cols-2 md:gap-2 md:items-start">
              <img className="my-2" src={`${API_URL}${project?.poster}`} alt={project?.title}/>
              <div className="grid grid-cols-1 divide-y-2 md:my-2">
                <div className="movie-description">
                  <GenreIcon/>
                  <div className=""> Жанр: {project?.genre}</div>
                </div>
                <div className="movie-description">
                  <TimeIcon/>
                  <div>Год: {project?.year}</div>
                </div>
                <div className="movie-description">
                  <DurationIcon/>
                  <div>Хронометраж: {project?.length} мин</div>
                </div>
                <AccordionTeam project={project}/>
              </div>
            </div>
            <div className="lg:w-2/3 lg:m-4 text-2xl accordion-description-text">
              <div className="lg:grid grid-cols-3 text-center divide-x-2 border-b-2 hidden">
                <div className="m-2 flex justify-center items-center hover:text-st88-secondary">
                  <ScenarioIcon/>
                  {project?.scenario?.text ? 
                  <a className="m-2" href={project?.scenario.text} download>
                    Cценарий
                  </a>
                  :<div className="m-2 text-gray-700 hover:text-gray-700"> Сценарий</div>
                  }
                </div>
                <div className={`flex justify-center items-center m-2 ${project?.linked_trailer? "hover:text-st88-secondary" : "text-gray-700"}`}>
                  <TrailerIcon/>
                  <a href={project?.linked_trailer} download className="m-2">
                    Трейлер
                  </a>
                </div>
                <div className={`flex justify-center items-center m-2 ${project?.linked_film ? "hover:text-st88-secondary" : "text-gray-700"}`}>
                  <MovieIcon/>
                  <a href={project?.linked_film} download className="m-2">
                    Фильм
                  </a>
                </div>
              </div>
              <AccordionSynopsis synopsis={project?.synopsys}/>
              <AccordionSources project={project}/>
              {project?.links?.length  ?  <AccordionLinks links={project?.links}/> : <></>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
// TODO: - currect style, add scenario docs
