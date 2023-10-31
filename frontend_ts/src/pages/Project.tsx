import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProject } from "../models";
import Loader from "../components/components/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import ProjectService from "../services/projects";
import { API_URL } from "../services/settings/urls";

const Project = () => {
  const [project, setproject] = useState<IProject>();
  const params = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject(params.url);
    // setTimeout(()=>{
    //     setLoading(false)
    // }, 1000)
    console.log(project?.scenario.text)
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
          <div className="container lg:flex lg:flex-wrap grid grid-cols-1 justify-center lg:divide-x-2 text-center text-4xl project-title ">
            <div className="p-5">{project?.title}</div>
          </div>
          <div className="container flex">
            <div className="w-1/3 flex flex-col m-4">
              <img src={`${API_URL}${project?.poster}`} />
              <div className="text-2xl">Год: {project?.year}</div>
              <div>
                <video width="320" height="240" controls>
                  <source src={project?.downloaded_film} type="video/mp4" />
                  <source src={project?.downloaded_film} type="video/ogg" />
                </video>
                <iframe
                  width="400"
                  height="300"
                  loading="lazy"
                  src="https://www.youtube.com/embed/mS8YraEXC9c?si=DG92Kt4kaAXVKSFQ"
                ></iframe>
                {/* <iframe src="https://platform.twitter.com/widgets/tweet_button.html" style={{border: '0', width:'130px', height:'20px'}}></iframe> */}
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/mS8YraEXC9c?si=DG92Kt4kaAXVKSFQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe> */}
              </div>
            </div>
            <div className="w-2/3">
              <div>
                <div>
                  <div>Синопсис</div>
                  <div>Сценарий: {project?.scenario.text}</div>
                  <a href={project?.scenario.text} download>link_text</a>
                </div>
                <div>{project?.synopsys}</div>
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