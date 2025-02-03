import "./postCards.css";
import dateTime from "../../utils/dateTime";
import { useNavigate } from "react-router-dom";
import { IBook } from "../../interfaces/BookInterfaces";

interface IBookIndexProps {
    book: IBook
    index: number
}

const BookPost = (props: IBookIndexProps) => {
    const navigate = useNavigate();
    return(
    <>
    <div
        className="post-container"
        onClick={() => navigate(`/book/${props.book.url}`)}
      >
        <img
          className="post-image"
          src={props.book.poster}
          alt={props.book.title}
        />
        <div className="movie-post-text-container">
          <h2 className="flex justify-center"><div className="post-type-fixed">Книга</div></h2>
          <h3 className="movie-post-title">{props.book.title}</h3>
          <hr/>
          <h3 className="movie-post-original-title">
            {props.book.original_title}
          </h3>
        </div>
        <div className="post-date">
          <div className="vertical flex divide-y-2 gap-1">{dateTime(props.book.release_date).map((dateItem: string)=><div className="pt-1">{dateItem}</div>)}</div>
        </div>  
      </div>
    </>)
};
export default BookPost;