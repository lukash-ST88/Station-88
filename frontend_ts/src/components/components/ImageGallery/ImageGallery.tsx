import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { IMovie } from '../../../interfaces/MovieInterfaces';
import { IFrame } from '../../../interfaces/FrameInterface';
import { API_URL } from '../../../services/settings/urls';
import { IProject } from '../../../interfaces/ProjectInterfaces';


interface IImageGalleryProps {
    item: IMovie | IProject
}

const ImageGallery = (props: IImageGalleryProps) => {
    return (
        <div className="App m-2">
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames='flex flex-wrap justify-center items-center gap-2 '
            >
                {props.item.frames!.map((frame: IFrame, index: number) => 
                    <a href={`${API_URL}${frame.image}`} key={index} className="">
                        <img alt={frame.title} src={`${API_URL}${frame.image}`} className='lg:max-w-[200px] max-w-[160px]'/>
                    </a>
                )}
                
            </LightGallery>
        </div>
    );
};
export default ImageGallery;