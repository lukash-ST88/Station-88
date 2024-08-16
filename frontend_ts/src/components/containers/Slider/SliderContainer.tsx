import { useState, useEffect } from "react";
import Slider from "./Slider";
import "./Slider.css";
import { IBanners } from "../../../interfaces/RestInterfaces";
import BannersService from "../../../services/banners";


const SliderContainer = () => {
  const [banners, setBanners] = useState<IBanners[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    retrieveBanners();
    setTimeout(() => {
      setLoading(false); // TODO: - fix this
    }, 1500);
  }, []);
  
  //TODO: - useMemo
  function retrieveBanners() {
    BannersService.getAllBanners()
      .then((response) => setBanners(response.data))
      .catch((e) => console.log(e));
  }

  return (
    <>
      {banners.length ? 
      <div className="image-container">
        <Slider slides={banners} loading={loading} />
      </div>
      : <></>
      }
    </>
  );
};

export default SliderContainer;
