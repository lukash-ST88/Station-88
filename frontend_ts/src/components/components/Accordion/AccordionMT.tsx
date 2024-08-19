import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { IMovie } from "../../../interfaces/MovieInterfaces";
import "./Accordion.css"
import {IconM} from "./AccordionSet"

interface IMovieProps {
  movie: IMovie | undefined;
}


function AccordionMovie(props: IMovieProps) {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  
  return (
    <div className="mx-4">
      {props.movie?.ST88descriptions.map((description) => {
        return (<>
        {description?.description ? 
        <Accordion open={open === description?.id} icon={<IconM open={open} description={description}/>}>
            <AccordionHeader
              className="text-white hover:text-st88-secondary"
              onClick={() => handleOpen(description?.id)}
            >
              {description?.author.profile?.first_name}{" "}
              {description?.author.profile?.last_name}
            </AccordionHeader>
            <AccordionBody className="text-white">
              <div dangerouslySetInnerHTML={{ __html: description?.description }} />
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
