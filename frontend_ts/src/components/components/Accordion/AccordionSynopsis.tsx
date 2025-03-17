import { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import "./Accordion.css"
import SynopsisIcon from "../../icons/SynopsisIcon";

interface IAccordionSynopsisProps{
    synopsis?: string,
}

const AccordionSynopsis = (props: IAccordionSynopsisProps) => {
    const [open, setOpen] = useState<boolean>(true);
    return(
        <div className="">
            <Accordion open={open} icon={<SynopsisIcon/>}>
                <AccordionHeader
                className="text-white hover:text-st88-secondary border-b-2"
                onClick={() =>setOpen(!open) }
                >
                <div className="accordion-description-text">Синопсис</div>
                </AccordionHeader>
                <AccordionBody className="ckeditor-content md:px-10 px-[18px] text-white">
                    {props.synopsis}
                </AccordionBody>
          </Accordion>   
        </div>
    )
}

export default AccordionSynopsis;




