import { useState, useEffect, useMemo } from "react";
import Slider from "./Slider";
import "./Slider.css";
import { IBanners } from "../../../interfaces/RestInterfaces";
import BannersService from "../../../services/banners";
import Loader from "../../components/Loader/Loader";


const SliderContainer = () => {
  const [banners, setBanners] = useState<IBanners[]>([]);

  const bannerCache = useMemo(()=> banners, [banners])

  useEffect(() => {
    retrieveBanners();
  }, []);

  async function retrieveBanners() {
    await BannersService.getAllBanners()
      .then((response) => setBanners(response.data))
      .catch((e) => console.log(e));
  }

  return (
    <>
      {banners.length ? 
      <div className="image-container">
        <Slider slides={bannerCache} />
      </div>
      : <div className='image-container flex justify-center items-center'><Loader/></div>
      }
    </>
  );
};

export default SliderContainer;
