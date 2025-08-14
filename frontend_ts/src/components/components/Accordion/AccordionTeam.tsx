import { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import AuthorList from "../../utils/AuthorList";
import { IProject } from "../../../interfaces/ProjectInterfaces";
import "./Accordion.css"
import TeamIcon from "../../icons/TeamIcon";

interface IAccordionTeamProps {
    project: IProject | undefined
}

const AccordionTeam = (props: IAccordionTeamProps) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
    <>
     <div className="text-center">
        <Accordion open={open} icon={<TeamIcon/>}>
            <AccordionHeader
              className="text-white hover:text-red-500 border-b-2"
            onClick={() =>setOpen(!open)}
            >
              <div className="accordion-description-text font-semibold">Съёмочная команда</div>
            </AccordionHeader>
            <AccordionBody className="text-white border-b-2 text-base">
              <AuthorList authors={props.project?.directors} outerAuthors={props.project?.outer_directors} workTitle="Режиссёр" workTitlePlural="Режиссёры"/>
              <AuthorList authors={props.project?.writers} outerAuthors={props.project?.outer_writers} workTitle="Сценарист" workTitlePlural="Сценаристы"/>
              <AuthorList authors={props.project?.cinematographers} outerAuthors={props.project?.outer_cinematographers} workTitle="Оператор" workTitlePlural="Операторы"/>
              <AuthorList authors={props.project?.producers} outerAuthors={props.project?.outer_producers} workTitle="Продюсер" workTitlePlural="Продюсеры"/>
              <AuthorList authors={props.project?.actors} outerAuthors={props.project?.outer_actors} workTitle="Актёр" workTitlePlural="Актёры"/>
              <AuthorList authors={props.project?.editors} outerAuthors={props.project?.outer_editors} workTitle="Монтажёр" workTitlePlural="Монтажёры"/>
              <AuthorList authors={props.project?.designers} outerAuthors={props.project?.outer_designers} workTitle="Художник" workTitlePlural="Художники"/>
            </AccordionBody>
          </Accordion>   
    </div>
    </>)
}

export default AccordionTeam;