import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProject, IUser } from "../models";
import Loader from "../components/components/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import ProjectService from "../services/projects";
import { API_URL } from "../services/settings/urls";

const Project = () => {
  const [project, setproject] = useState<IProject>();
  const params = useParams();
  

  useEffect(() => {
    fetchProject(params.url);
    console.log(project?.scenario.text);
  }, []);

  const [fetchProject, isProjectLoading, ProjectError]: any = useFetching(
    async (url: string) => {
      const response = await ProjectService.getProjectByUrl(url);
      setproject(response.data);
    }
  );

  return (
    <>
      {isProjectLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="container lg:flex lg:flex-wrap grid grid-cols-1 justify-center lg:divide-x-2 text-center lg:text-4xl text-xl project-title ">
            <div className="p-5">{project?.title}</div>
          </div>
          <div className="container flex">
            <div className="w-1/3 flex flex-col justify-start m-4 divide-y-2 description-text">
              <img className="my-2" src={`${API_URL}${project?.poster}`} />
              <div className="lg:text-2xl text-xl text-center py-2">
                Авторы:{" "}
                {project?.authors.map((author: IUser, index: number) => {
                  return (
                    <span key={index}>
                      {author.profile?.last_name} {author.profile?.first_name}
                    </span>
                  );
                })}
              </div>
              <div className="lg:text-2xl text-xl text-center py-2">
                Год: {project?.year}
              </div>
            </div>
            <div className="w-2/3 m-4 divide-y-2 text-2xl">
              <div className="grid grid-cols-2 text-center divide-x-2">
                <div className="m-2 text-red-500">Синопсис</div>
                <a
                  className="m-2 hover:text-red-500"
                  href={project?.scenario.text}
                  download
                >
                  Cценарий
                </a>
              </div>
              <div className="text-base p-3">{project?.synopsys}</div>
              <div className="grid grid-cols-2 text-center divide-x-2">
                <div className="m-2 text-red-500">Трейлер</div>
                <a
                  className="m-2 hover:text-red-500"
                  href={project?.linked_film}
                  download
                >
                  Фильм
                </a>
              </div>
              <div>
                {project?.linked_trailer && (
                <video width="750" height="500" controls>
                  <source src={project?.linked_trailer} type="video/mp4" />
                </video>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
// TODO: - currect style, add scenario docs
