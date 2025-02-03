import { useParams } from "react-router-dom";
import Loader from "../components/components/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { API_URL } from "../services/settings/urls";
import { useEffect, useState } from "react";
import BookService from "../services/books";
import { IBook } from "../interfaces/BookInterfaces";
import AccordionBook from "../components/components/Accordion/AccordionBook";
import TimeIcon from "../components/icons/TimeIcon";
import GenreIcon from "../components/icons/GenreIcon";
import { FiFeather } from "react-icons/fi";
import { MdLaptopChromebook } from "react-icons/md";

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
        <title> {book?.title} </title> 
        <meta name="description" content={`Рецензии на книгу "${book?.title}"`}/>

        {isBookLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="movie-title-container">
              <h1 className="movie-title">{book?.title}</h1>
              {Boolean(book?.original_title) &&
              <h1 className="movie-original-title">
                {book?.original_title}
              </h1>
              }  
            </div>
            <div className="container flex flex-wrap justify-center">
              <div className="lg:w-1/3 lg:flex lg:flex-col lg:justify-start lg:my-4 divide-y-2">
                <div className="md:grid md:grid-cols-2 md:gap-2 lg:divide-y-2 lg:block min-w-[250px]">
                  <div className="flex justify-center items-center"><img className="my-2 w-[200px] lg:w-[360px] " src={`${API_URL}${book?.poster}`} alt="book poster"/></div>
                  <div className="divide-y-2">
                    <div className="movie-description">
                      <FiFeather className="w-6 h-6"/>
                      <h2>Автор: {book?.writer}</h2>
                    </div>
                    <div className="movie-description">
                      <TimeIcon/>
                      <div>Год: {book?.year}</div>
                    </div>
                    <div className="movie-description">
                      <GenreIcon/>
                    <div>Жанр: {book?.genre}</div>
                    </div>
                    {book?.ebook &&
                    <div className="movie-description">
                        <MdLaptopChromebook className="w-6 h-6"/>
                        <a className="" href={book?.ebook} download>
                          Электронная книга
                        </a>
                    </div>
                    }
                  </div>
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