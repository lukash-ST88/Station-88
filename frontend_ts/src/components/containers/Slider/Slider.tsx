import {useState, useEffect, useContext} from 'react'
import './Slider.css'
import { IBanners } from '../../../models'
import Loader from '../../components/Loader/Loader'
import { Link } from 'react-router-dom'

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
          <div onClick={goToPrevious} className='arrow left hover:text-white'>
            ❰
          </div>
          <div onClick={goToNext} className='arrow right hover:text-white'>
            ❱
          </div>
        </div>
        {props.loading 
        ? <div className='flex justify-center'><Loader/></div>
        : <Link to={props.slides[currentIndex].link}><div className='text-slider transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110'>{props.slides[currentIndex].title}</div><div className='slide' style={{backgroundImage: `url(${props.slides[currentIndex].banner})`}}></div></Link>
        }
        <div className='dot-container'>
          {props.slides.map((slide, slideIndex) => (
            <div
              className='dot hover:text-white transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110'
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