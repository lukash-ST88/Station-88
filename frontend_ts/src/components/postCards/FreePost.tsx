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
        className="container grid grid-cols-16 my-5 border-2 hover:ring-4 z-0 hover:z-10 hover:text-black hover:bg-white hover:ring-white transition duration-100 ease-in-out transform hover:lg:-translate-y-1 hover:lg:scale-110 hover:cursor-pointer"
        onClick={() => navigate(`/free-post/${props.freePost.url}`)}
      >
        <img
          className="object-cover col-span-4 h-80 w-50 "
          src={props.freePost.poster}
          alt={props.freePost.title}
        />
        <div className="col-span-11 justify-self-center self-center text-center divide-y-2">
        <div className="flex justify-center"><div className="fixed top-0 bg-white text-black p-1">Пост</div></div>
          <div className="movie-title-post">{props.freePost.title}</div>
          <div className="movie-original-title-post">
            {props.freePost.subtitle}
          </div>
        </div>
        <div className="col-span-1 flex bg-white justify-center text-black items-center">
          <div className="vertical">{dateTime(props.freePost.release_date)}</div>
        </div>
      </div>
    </>)
};

export default FreePost;