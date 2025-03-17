import { IconButton } from "@material-tailwind/react";
import { ClosingCross } from "../../utils/svgImages";
import { MdFilterList } from "react-icons/md";

interface IFilterNavProps {
    openNav: boolean
    setOpenNav: Function
    title: string
}

const FilterNav = (props: IFilterNavProps) =>{
    return (
        <>
            <div className="flex justify-between items-center lg:hidden mx-2">
                        <IconButton variant="text" className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-st88-main" ripple={false} onClick={() => props.setOpenNav(!props.openNav)}>
                                  {props.openNav ? <ClosingCross/> : <MdFilterList  className="text-2xl" />}
                        </IconButton>
                        <h1 className="border-b-2 cursor-default px-4 py-2 text-st88-main font-bold border-st88-main text-xl">
                          {props.title}
                        </h1>
                        <IconButton variant="text" className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-st88-main" ripple={false} onClick={() => props.setOpenNav(!props.openNav)}>
                                  {props.openNav ? <ClosingCross/> : <MdFilterList  className="text-2xl" />}
                        </IconButton>
                      </div>
        </>
    )
};
export default FilterNav;