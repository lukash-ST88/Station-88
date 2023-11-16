import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { IMovie, IST88description } from "../../../models";
import "./Accordion.css"
import getColorRating from "../../../utils/getColorRating";

interface IMovieProps {
  movie: IMovie | undefined;
}
interface IIDOpen {
    open: number
    description: IST88description | undefined;
}



function IconM(props: IIDOpen){
    return (<>
        {props.description?.id === props.open 
            ? <div className="w-7 h-7 text-center rotate-359 transition-transform rounded" style={getColorRating(props.description.rating)}>{props.description.rating}</div>
            : <div className="bg-white w-7 h-7 rotate-90 rounded"></div>
         }
         </>);
  }

function AccordionMT(props: IMovieProps) {
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
              className="text-white hover:text-red-500"
              onClick={() => handleOpen(description?.id)}
            >
              {description?.author.profile?.first_name}{" "}
              {description?.author.profile?.last_name}
            </AccordionHeader>
            <AccordionBody className="text-white">
              {description?.description}
            </AccordionBody>
          </Accordion>
          : null }
          </>
        );
      })}
    </div>
  );
}

export default AccordionMT;
