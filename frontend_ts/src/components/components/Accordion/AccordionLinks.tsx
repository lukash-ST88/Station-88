import { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";

interface IAccordionLinksProps{
    links: string[] | undefined
}


const AccordionLinks = (props:IAccordionLinksProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return(<>
    <div className="">
        <Accordion open={open} className="">
            <AccordionHeader
              className="text-white hover:text-red-500 border-b-2"
              onClick={() =>setOpen(!open) }
            >
            <div></div>{/* dont remove these divs they are for alignment center */}
            <div className="accordion-description-text text-2xl font-light">Связанные источники</div>
            </AccordionHeader>
            <AccordionBody className="text-white">
              {props.links?.map((link) => (
                <div><a href={link} className="text-gray-500 hover:text-red-500 hover:cursor-pointer italic text-xl text-center">
                    {link}
                </a>
                </div>
              ))}
            </AccordionBody>
          </Accordion>   
    </div>
    </>)
}
export default AccordionLinks;