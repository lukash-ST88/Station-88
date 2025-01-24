import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { IBook } from "../../../interfaces/BookInterfaces";
import "./Accordion.css"
import {IconM} from "./AccordionSet"

interface IBookProps {
  book: IBook | undefined;
}


function AccordionBook(props: IBookProps) {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  
  return (
    <div className="mx-4">
      {props.book?.ST88descriptions.map((description) => {
        return (<>
        {description?.description ? 
        <Accordion open={open === description?.id} icon={<IconM open={open} description={description}/>}>
            <AccordionHeader
              className="text-white hover:text-st88-secondary accordion-description-text" 
              onClick={() => handleOpen(description?.id)}
            >
              Рецензия: {description?.author.profile?.first_name}{" "} {description?.author.profile?.last_name}
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

export default AccordionBook;
