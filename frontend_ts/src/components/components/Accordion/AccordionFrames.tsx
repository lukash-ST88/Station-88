import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import "./Accordion.css"
import { IMovie } from "../../../interfaces/MovieInterfaces";
import ImageGallery from "../ImageGallery/ImageGallery";
import { FaImage } from "react-icons/fa6";


interface IAccordionFramesProps {
  movie: IMovie;
}


function AccordionFrames(props: IAccordionFramesProps) {
  const [open, setOpen] = React.useState<boolean>(true);
  
  return (
    <div className="mx-4">
        <Accordion open={open} icon={<FaImage />}>
            <AccordionHeader
              className="text-white hover:text-st88-secondary accordion-description-text"
              onClick={() =>setOpen(!open) }
            >
              Кадры
            </AccordionHeader>
            <AccordionBody className="text-white">
              <ImageGallery movie={props.movie}/>
            </AccordionBody>
          </Accordion>   
    </div>
  );
}

export default AccordionFrames;
