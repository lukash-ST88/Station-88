import { useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { API_URL } from "../services/settings/urls";
import { useEffect, useState } from "react";
import BookService from "../services/books";
import { IBook } from "../interfaces/BookInterfaces";
import AccordionBook from "../components/components/Accordion/AccordionBook";

const Book = () => {
    const [book, setBook] = useState<IBook>();
    const params = useParams<string>();
    
    useEffect(() => {
      fetchBook(params.url);
    }, []);
  
    const [fetchBook, isBookLoading, bookError]: any = useFetching(
      async (url: string) => {
        const response = await BookService.getBookByUrl(url);
        setBook(response.data);
      }
    );
  
    return (
      <>
        {isBookLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="container lg:flex lg:flex-wrap grid grid-cols-1 justify-center lg:divide-x-2 text-center text-4xl">
              <div className="p-5 book-title">{book?.title}</div>
              {Boolean(book?.original_title) &&
              <div className="p-5 book-original-title">
                {book?.original_title}
              </div>
              }  
            </div>
            <div className="container flex flex-wrap justify-center">
              <div className="lg:w-1/3 lg:flex lg:flex-col lg:justify-start my-4 divide-y-2 description-text">
                <img className="my-2" src={`${API_URL}${book?.poster}`} alt="book poster"/>
                <div className="text-2xl text-center py-2">
                  Автор: {book?.writer}
                </div>
                <div className="text-2xl text-center py-2">
                  Год: {book?.year}
                </div>
                <div className="text-2xl text-center py-2">
                  Жанр: {book?.genre}
                </div>
              </div>
              <div className="lg:w-2/3">
                <AccordionBook book={book} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Book;