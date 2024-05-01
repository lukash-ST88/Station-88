import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { IArticle } from "../../../interfaces/ArticleInterfaces";
import "./Accordion.css"
import { useNavigate } from "react-router-dom";


interface IAccordionArticlesProps {
  articles: IArticle[] | undefined[];
}


function AccordionArticles(props: IAccordionArticlesProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();

  
  return (
    <div className="mx-4">
        <Accordion open={open}>
            <AccordionHeader
              className="text-white hover:text-red-500"
              onClick={() =>setOpen(!open) }
            >
              Связанные статьи
            </AccordionHeader>
            <AccordionBody className="text-white">
              {props.articles?.map((article) => (
                <div 
                onClick={() => navigate(`/article/${article?.url}`)} 
                className="text-gray-500 hover:text-red-500 hover:cursor-pointer italic text-xl text-center">
                    {article?.title}
                </div>
              ))}
            </AccordionBody>
          </Accordion>   
    </div>
  );
}

export default AccordionArticles;
