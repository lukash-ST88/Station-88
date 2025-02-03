import { mainDescription } from "../../../utils/metaContent";
import "../divisions.css"

const IntroductionDivision = () => {
    return (
        <>
            <div className="flex justify-center gap-10 items-center p-5 bg-gradient-to-r from-st88-background via-st88-main to-st88-background ">
                <div className="hidden lg:flex flex-col justify-center items-center gap-2 border-2 px-5 cursor-default bg-st88-background h-[300px]">
                    <img className='w-[180px] h-auto border-b-2 pb-1 border-white' src='/images/Durica_v4.png' alt='station88-logo'/>
                    <h1 className="station88 hover:text-white">СТАНЦИЯ 88</h1>
                </div>
                <div className="bg-st88-background lg:p-4 p-2 border-2 max-w-[500px] text-center h-[300px] flex justify-center items-center">
                    <div className="site-description">{mainDescription}</div>
                </div>
            </div>
        </>
    )
};

export default IntroductionDivision;
