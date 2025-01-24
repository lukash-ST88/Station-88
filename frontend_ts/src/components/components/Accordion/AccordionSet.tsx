import { IST88description } from "../../../interfaces/ReviewDescriptionInterfaces";
import getColorRating from "../../../utils/getColorRating";


interface IIDOpen {
    open: number
    description: IST88description | undefined;
}


export function IconM(props: IIDOpen){
    return (<>
        {props.description?.id === props.open 
            ? <div className="w-7 h-7 text-center rotate-359 transition-transform rounded flex items-center justify-center" style={getColorRating(props.description.rating)}>{props.description.rating}</div>
            : <div className="bg-white w-7 h-7 rotate-90 rounded"></div>
         }
         </>);
};


