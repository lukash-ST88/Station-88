import { useEffect, useState } from "react";
import "../divisions.css"
import { TiArrowUpThick } from "react-icons/ti";
import { TiArrowDownThick } from "react-icons/ti";
import { ISlider } from "../../../interfaces/Interfaces";
import SlidersService from "../../../services/slider";


const TwoSidesSliderDivision = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

    const [sliders, setSliders] = useState<ISlider[]>([]);
    
    const [slidesCount, setSlidesCount] = useState<number>(0);
    
    const height = 480
    const width = 950


    useEffect(()=>{
        retrieveSliders()
    }, [])

    useEffect(()=>{
        setSlidesCount(sliders.length - 1)
    }, [sliders])



    async function retrieveSliders() {
        await SlidersService.getAllSliders()
            .then((response)=>setSliders(response.data))
            .catch((e) => console.log(e));
    }


    function changeSlide(direction: string) {
        if (direction === 'up') {
            setActiveSlideIndex(activeSlideIndex + 1)
            if (activeSlideIndex + 1 === slidesCount + 1) {
                setActiveSlideIndex(0)
            }
        }
        else if (direction === 'down') {
            setActiveSlideIndex(activeSlideIndex - 1)
            if (activeSlideIndex - 1 < 0) {
                setActiveSlideIndex(slidesCount)
            }
        }
    }


    return (
        <>
         <div className="md:mt-10 mt-5 p-5 bg-gradient-to-r from-st88-background via-white to-st88-background">
             <div className="hidden lg:flex justify-center items-center">
                <div className="ring-2 ring-white relative overflow-hidden" style={{height, width}}>
                    {sliders.length > 0 && 
                        <div className="grid grid-cols-3">
                            <div className="col-span-1" style={
                                {
                                    height, 
                                    transform: `translateY(-${(slidesCount- activeSlideIndex) * height}px)`, 
                                    top: `-${slidesCount * height}px`,
                                    transition: `transform 0.5s ease-in-out`
                                }}>
                                {[...sliders].reverse().map((slider: ISlider, index: number)=> {
                                    return (
                                        <a href={slider.link}>
                                            <div className="flex flex-col justify-center items-center px-5 text-center hover:cursor-pointer transition duration-100 ease-in-out transform  hover:lg:scale-110" style={{height, backgroundColor: slider.color}} key={index}>
                                                <h2 className="text-4xl">{slider.title}</h2>
                                                <h3 className="text-sm">{slider.description}</h3>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                            <div className="col-span-2" style={
                                {
                                    height, 
                                    transform: `translateY(-${activeSlideIndex * height}px)`,
                                    transition: `transform 0.5s ease-in-out`
                                }}>
                                    {sliders.map((slider: ISlider, index: number)=>{
                                        return(
                                            <a href={slider.link}>
                                                <img className={`h-[100%] w-[100%] object-cover object-center hover:lg:bg-white hover:ring-white transition duration-100 ease-in-out transform  hover:lg:scale-110 cursor-pointer`}
                                                    src={slider.slider} alt={slider.title} key={index}/>
                                            </a>
                                        )
                                    })}
                            </div>
                        </div>
                    }
                    <div className="absolute" style={{top: `calc(50% - 50px)`, left: `calc(33.3% - 25px)`}}>
                        <div className="border-2 w-[50px] h-[100px] flex flex-col justify-center items-center cursor-pointer bg-white opacity-90">
                          <TiArrowUpThick className="text-4xl hover:text-st88-third text-st88-background" onClick={()=> changeSlide('up')}/>
                          <TiArrowDownThick className="text-4xl hover:text-st88-third text-st88-background" onClick={()=> changeSlide('down')}/>
                        </div>
                    </div>
                </div>
             </div>
        </div>
        </>
    )
};

export default TwoSidesSliderDivision;