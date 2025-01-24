import { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import BoundArticlesIcon from "../../icons/BoundArticlesIcon";
import "./Accordion.css"

interface IAccordionLinksProps{
    links: string[] | undefined
}


const AccordionLinks = (props:IAccordionLinksProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return(<>
    <div className="">
        <Accordion open={open} icon={<BoundArticlesIcon/>}>
            <AccordionHeader
              className="text-white hover:text-st88-secondary border-b-2"
              onClick={() =>setOpen(!open) }
            >
            {/* <div></div>dont remove these divs they are for alignment center */}
            <div className="accordion-description-text">Связанные источники</div>
            </AccordionHeader>
            <AccordionBody className="text-white">
              {props.links?.map((link) => (
                <a href={link} className="link-text">
                    {link}
                </a>
              ))}
            </AccordionBody>
          </Accordion>   
    </div>
    </>)
}
export default AccordionLinks;