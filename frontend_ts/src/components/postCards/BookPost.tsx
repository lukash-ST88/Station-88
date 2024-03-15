import "./postCards.css";
import dateTime from "../../utils/dateTime";
import { useNavigate } from "react-router-dom";
import { IBook } from "../../models";

interface IBookIndexProps {
    book: IBook
    index: number
}

const BookPost = (props: IBookIndexProps) => {
    const navigate = useNavigate();
    return(
    <>
    <div
        className="container grid grid-cols-16 m-5 border-2 hover:ring-4 z-0 hover:z-10 hover:text-black hover:bg-white hover:ring-white transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
        onClick={() => navigate(`/book/${props.book.url}`)}
      >
        <img
          className="object-cover col-span-4 h-84 w-full "
          src={props.book.poster}
          alt={props.book.title}
        />
        <div className="col-span-11 justify-self-center self-center text-center">
        <div className="flex justify-center"><div className="fixed top-0 bg-white text-black p-1">Книга</div></div>
          <div className="movie-title-post">{props.book.title}</div>
          <hr/>
          <div className="movie-original-title-post">
            {props.book.original_title}
          </div>
        </div>
        <div className="col-span-1 flex bg-white justify-center text-black items-center">
          <div className="vertical">{dateTime(props.book.release_date)}</div>
        </div>
      </div>
    </>)
};
export default BookPost;