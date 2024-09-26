import { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import "./Accordion.css"
import SynopsisIcon from "../../icons/SynopsisIcon";
import { IProject } from "../../../interfaces/ProjectInterfaces";
import SourceIcon from "../../icons/SourceIcon";
import ScenarioIcon from "../../icons/ScenarioIcon";
import TrailerIcon from "../../icons/TrailerIcon";
import MovieIcon from "../../icons/MovieIcon";

interface IAccordionSourcesProps{
    project: IProject | undefined
}

const AccordionSources = (props: IAccordionSourcesProps) => {
    const [open, setOpen] = useState<boolean>(false);
    return(
        <Accordion open={open} icon={<SourceIcon/>}>
            <AccordionHeader
            className="text-white hover:text-st88-secondary border-b-2 lg:hidden "
            onClick={() =>setOpen(!open) }
            >
            <div className="accordion-description-text mx-2">Источники</div>
            </AccordionHeader>
            <AccordionBody className="text-white border-b-2 grid grid-cols-1 accordion-description-text">
                <div className="m-2 flex justify-start items-center hover:text-st88-secondary">
                    <ScenarioIcon/>
                    {props.project?.scenario?.text ? 
                    <a className="m-2 " href={props.project?.scenario.text} download>
                        Cценарий
                    </a>
                    :<div className="m-2 text-gray-700 hover:text-gray-700"> Сценарий</div>
                    }
                </div>
                <div className={`flex justify-start items-center m-2 ${props.project?.linked_trailer? "hover:text-st88-secondary" : "text-gray-700"}`}>
                    <TrailerIcon/>
                    <a href={props.project?.linked_trailer} download className="m-2">
                        Трейлер
                    </a>
                </div>
                <div className={`flex justify-start items-center m-2 ${props.project?.linked_film ? "hover:text-st88-secondary" : "text-gray-700"}`}>
                    <MovieIcon/>
                    <a href={props.project?.linked_film} download className="m-2">
                        Фильм
                    </a>
                </div>
            </AccordionBody>
        </Accordion>   
    )
}

export default AccordionSources;




