import { useNavigate } from "react-router";
import { IFreePost } from "../../interfaces/FreePostInterfaces";
import dateTime from "../../utils/dateTime";

interface IFreePostIndexProps{
    index: number
    freePost: IFreePost
}

const FreePost = (props: IFreePostIndexProps) => {
    const navigate = useNavigate();
    return(
    <>
    <div
        className="post-container"
        onClick={() => navigate(`/free-post/${props.freePost.url}`)}
      >
        <img
          className="post-image"
          src={props.freePost.poster}
          alt={props.freePost.title}
        />
        <div className="col-span-11 justify-self-center self-center text-center divide-y-2">
        <h2 className="flex justify-center"><div className="fixed top-0 bg-white text-black p-1">Пост</div></h2>
          <h3 className="free-post-title">{props.freePost.title}</h3>
          <h4 className="free-post-subtitle">
            {props.freePost.subtitle} 
          </h4>
        </div>
        <div className="post-date">
          <div className="vertical flex divide-y-2 gap-1">{dateTime(props.freePost.release_date).map((dateItem: string)=><div className="pt-1">{dateItem}</div>)}</div>
        </div>
      </div>
    </>)
};

export default FreePost;