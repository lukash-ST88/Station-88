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
import ScenarioIcon from "../components/icons/ScenarioIcon";
import MovieIcon from "../components/icons/MovieIcon";
import TrailerIcon from "../components/icons/TrailerIcon";
import AccordionSynopsis from "../components/components/Accordion/AccordionSynopsis";
import AccordionSources from "../components/components/Accordion/AccordionSources";
import AccordionFrames from "../components/components/Accordion/AccordionFrames";
import { YearRepresentation } from "../utils/dataRepresentation";

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
      <title> {project?.title} </title> 
      <meta name="description" content={project?.synopsys}/>

      {isProjectLoading 
      ? (
        <div className="flex justify-center items-center h-screen"><Loader/></div>
      ) 
      : (
        <div>
          <div className="project-title-container">
            <h1 className="movie-title ">{project?.title}</h1>
          </div>
          <div className="container lg:flex ">
            <div className="lg:w-1/3 lg:flex flex-col justify-center mt-4 divide-y-2 md:grid grid-cols-2 md:gap-2 lg:items-center md:items-start">
              <div className="flex justify-center items-center"><img className="my-2 w-[200px] md:w-[280px] lg:w-[360px]" src={`${API_URL}${project?.poster}`} alt={project?.title}/></div>
              <div className="grid grid-cols-1 divide-y-2 my-2 w-full">
                <div className="movie-description">
                  <GenreIcon/>
                  <div className=""> Жанр: {project?.genre}</div>
                </div>
                <div className="movie-description">
                  <TimeIcon/>
                  <div>Год: {YearRepresentation(project?.year, project?.end_year)}</div>
                </div>
                <div className="movie-description">
                  <DurationIcon/>
                  <div>Хронометраж: {project?.length} мин</div>
                </div>
                <AccordionTeam project={project}/>
              </div>
            </div>
            <div className="lg:w-2/3 accordion-description-text">
              <div className="lg:grid grid-cols-3 text-center divide-x-2 border-b-2 hidden">
                <div className={`flex justify-center items-center ${project?.scenario?.text ? 'hover:text-st88-secondary': 'text-gray-700'}`}>
                  <ScenarioIcon/>
                  {project?.scenario?.text ? 
                  <a className="m-2" href={project?.scenario.text} download>
                    Cценарий
                  </a>
                  :<div className="m-2 text-gray-700 hover:text-gray-700"> Сценарий</div>
                  }
                </div>
                <div className={`flex justify-center items-center m-2 ${project?.linked_trailer ? "hover:text-st88-secondary" : "text-gray-700"}`}>
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
              {project?.frames && project.frames.length > 0 && <AccordionFrames item={project!}/>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
// TODO: - currect style, add scenario docs
