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
      {isFreePostLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="container lg:flex lg:flex-wrap grid grid-cols-1 justify-center lg:divide-x-2 text-center text-4xl FreePost-title ">
            <div className="p-5">{freePost?.title}</div>
            <div className="p-5 ">{freePost?.subtitle}</div>
          </div>
          <div className="container lg:text-4xl lg:px-20 text-xl">
            <div dangerouslySetInnerHTML={{ __html: freePost?.content }} />
          </div>
          <div className="mx-20 my-5 border border-r-0 border-t-0 border-b-0 border-green-500 text-2xl" style={{fontFamily: 'Restora', fontStyle: 'italic'}}>
          &nbsp;Автор:&nbsp;
            <span>
                 {freePost?.author?.profile?.first_name} {freePost?.author?.profile?.last_name} 
              </span>
          </div>
        </div>
      )}
    </>
  );
};

export default FreePost;

