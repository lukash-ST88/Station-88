import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { IMovie } from "../../../interfaces/MovieInterfaces";
import "./Accordion.css"
import {IconM} from "./AccordionSet"
import "../../../pages/pages.css"


interface IMovieProps {
  movie: IMovie | undefined;
}


function AccordionMovie(props: IMovieProps) {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  
  return (
    <div className="">
      {props.movie?.ST88descriptions.map((description) => {
        return (<>
        {description?.description ? 
        <Accordion open={open === description?.id} icon={<IconM open={open} description={description}/>}>
            <AccordionHeader
              className="text-white hover:text-st88-secondary accordion-description-text"
              onClick={() => handleOpen(description?.id)}
            >
              Рецензия: {description?.author.profile?.first_name} {description?.author.profile?.last_name}
            </AccordionHeader>
            <AccordionBody className="text-white py-0 lg:py-2">
              <div dangerouslySetInnerHTML={{ __html: description?.description }} className="ckeditor-content md:px-10 px-[18px]"/>
            </AccordionBody>
          </Accordion>
          : null }
          </>
        );
      })}
    </div>
  );
}

export default AccordionMovie;
