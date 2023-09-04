import {useState, useEffect, useContext} from 'react'
import './Slider.css'
import { IBanners } from '../../../models'
import Loader from '../../Loader/Loader'


interface SlidesProps {
    slides: IBanners[]
    loading: boolean
}



const Slider = (props: SlidesProps)=> {
    const [currentIndex, setCurrentIndex] = useState(0);
    

    const goToPrevious = ()=>{
        const isFirstSlide = currentIndex == 0;
        const newIndex = isFirstSlide ? props.slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        const h = `url(${props.slides[currentIndex].banner})`
        console.log(h)
        console.log('lefr arrow')
    };

    const goToNext = () => {
        const isLastSlide = currentIndex == props.slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        console.log('right arrow')
    }

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex)
    };

 


    return (
        <div className='slider'>
        <div>
          <div onClick={goToPrevious} className='arrow left'>
            ❰
          </div>
          <div onClick={goToNext} className='arrow right'>
            ❱
          </div>
        </div>
        {props.loading ? <Loader/> : <div className='slide' style={{backgroundImage: `url(${props.slides[currentIndex].banner})`}}/>}
        <div className='dot-container'>
          {props.slides.map((slide, slideIndex) => (
            <div
              className='dot'
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
            >
              ● 
            </div>
          ))}
        </div>
      </div>
    )
} 

export default Slider;