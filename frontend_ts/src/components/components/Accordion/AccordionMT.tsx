import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { IMovie } from "../../../models";
import "./Accordion.css"

interface IMovieProps {
  movie: IMovie | undefined;
}
interface IIDOpen {
    id: number | undefined
    open: number
}

function Icon(props: IIDOpen){
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        props.id === props.open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function IconM(props: IIDOpen){
    return (<>
        {props.id === props.open 
            ? <div className="bg-green-500 w-7 h-7 text-center rotate-359 transition-transform rounded">10</div>
            : <div className="bg-white w-7 h-7 rotate-90 rounded"></div>
         }
         </>);
  }

function AccordionMT(props: IMovieProps) {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value: number | any) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="mx-4">
      {props.movie?.ST88descriptions.map((description) => {
        return (
          <Accordion open={open === description?.id} icon={<IconM id={description?.id} open={open}/>}>
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
        );
      })}
    </div>
  );
}

export default AccordionMT;
