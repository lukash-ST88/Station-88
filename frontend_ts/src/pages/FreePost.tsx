import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import { useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import FreePostService from "../services/freePosts";
import { IFreePost} from "../interfaces/FreePostInterfaces";


const FreePost = () => {
  const [freePost, setFreePost] = useState<IFreePost>({} as IFreePost);
  const params = useParams<string>();
  
  useEffect(() => {
    fetchFreePost(params.url);
  }, []);

  const [fetchFreePost, isFreePostLoading, FreePostError]: any = useFetching(
    async (url: string) => {
      const response = await FreePostService.getFreePostByUrl(url);
      setFreePost(response.data);
    }
  );

  return (
    <>
      <title> {freePost.title} </title> 
      <meta name="description" content={freePost.subtitle}/> 

      {isFreePostLoading ? (
        <div className="flex justify-center items-center h-screen"><Loader/></div>
      ) : (
        <div>
          <div className="container lg:flex lg:flex-wrap grid grid-cols-1 justify-center lg:divide-x-2 text-center text-4xl movie-title-container">
            <h2 className="movie-title">{freePost?.title}</h2>
            {Boolean(freePost?.subtitle) && 
              <h3 className="movie-original-title">{freePost?.subtitle}</h3>
            }
          </div>
          <div className="container lg:text-4xl lg:px-20 text-xl pt-5">
            <div dangerouslySetInnerHTML={{ __html: freePost?.content }} className="ckeditor-content md:px-10 px-[18px] lg:px-[200px]"/>
          </div>
          <div className="lg:mx-20 my-5 border border-r-0 border-t-0 border-b-0 border-green-500 lg:text-2xl text-xl" style={{fontFamily: 'Restora', fontStyle: 'italic'}}>
            <h3>
                &nbsp;Автор:&nbsp;{freePost?.author?.profile?.first_name} {freePost?.author?.profile?.last_name} 
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default FreePost;

