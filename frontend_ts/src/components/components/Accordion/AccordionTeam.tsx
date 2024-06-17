import { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import AuthorList from "../../utils/AuthorList";
import { IProject } from "../../../interfaces/ProjectInterfaces";
import "./Accordion.css"

interface IAccordionTeamProps {
    project: IProject | undefined
}

const AccordionTeam = (props: IAccordionTeamProps) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
    <>
     <div className="text-center">
        <Accordion open={open}>
            <AccordionHeader
              className="text-white hover:text-red-500 border-b-2"
              onClick={() =>setOpen(!open) }
            >
              <div></div>{/* dont remove these divs they are for alignment center */}
              <div className="accordion-description-text font-semibold">Съёмочная команда</div>
            </AccordionHeader>
            <AccordionBody className="text-white border-b-2">
              <AuthorList authors={props.project?.directors} workTitle="Режиссёр" workTitlePlural="Режиссёры"/>
              <AuthorList authors={props.project?.writers} workTitle="Сценарист" workTitlePlural="Сценаристы"/>
              <AuthorList authors={props.project?.cinematographers} workTitle="Оператор" workTitlePlural="Операторы"/>
              <AuthorList authors={props.project?.producers} workTitle="Продюсер" workTitlePlural="Продюсеры"/>
              <AuthorList authors={props.project?.actors} workTitle="Актёр" workTitlePlural="Актёры"/>
              <AuthorList authors={props.project?.editors} workTitle="Монтажёр" workTitlePlural="Монтажёры"/>
              <AuthorList authors={props.project?.designers} workTitle="Художник" workTitlePlural="Художники"/>
            </AccordionBody>
          </Accordion>   
    </div>
    </>)
}

export default AccordionTeam;