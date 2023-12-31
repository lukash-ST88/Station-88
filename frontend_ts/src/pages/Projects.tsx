import { useState, useEffect, useRef } from "react";
import { IArticle, IProject } from "../models";
import ProjectService from "../services/projects";
import { useNavigate } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import { getPageCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/components/Loader/Loader";
import ProjectCard from "../components/cards/ProjectCard";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(6);
  const [offset, setOffset] = useState<number>(0);
  const lastElement = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    fetchProjects(limit, offset);
    // console.log(axios.defaults.headers.common["Authorization"]);
  }, [offset]);

  const [fetchProjects, isProjectLoading, ProjectError]: any = useFetching(
    async (limit: number, offset: number) => {
      const response = await ProjectService.getAllProjects(limit, offset);
      setProjects([...projects, ...response.data.results]);
      const totalCount = response.data.count;
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(
    lastElement,
    offset / limit + 1 < totalPages,
    () => setOffset(offset + limit),
    isProjectLoading
  );

  return (
    <>
      {projects ? (
        <div className="flex">
          <div className="">
            <TransitionGroup>
              <div className="grid grid-cols-4 gap-4">
                {projects.map((project: IProject, index: number) => {
                  return <ProjectCard project={project} index={index} />;
                })}
              </div>
            </TransitionGroup>
            <div
              ref={lastElement}
              style={{ height: 10, background: "transperent" }}
            />
            {isProjectLoading && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            ref={lastElement}
            style={{ height: 10, background: "transperent" }}
          />
          <div className="text-center text-2xl">
            На сегодняшний день ни одного проекта не заргуженно{" "}
          </div>
        </>
      )}
    </>
  );
}
export default Projects;
