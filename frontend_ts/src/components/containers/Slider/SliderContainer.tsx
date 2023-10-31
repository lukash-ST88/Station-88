import { useState, useEffect } from "react";
import Slider from "./Slider";
import "./Slider.css";
import { IBanners } from "../../../models";
import BannersService from "../../../services/banners";


const SliderContainer = () => {
  const [banners, setBanners] = useState<IBanners[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveBanners();
    setTimeout(() => {
      setLoading(false); // TODO: - fix this
    }, 1500);
  }, []);

  function retrieveBanners() {
    BannersService.getAllBanners()
      .then((response) => setBanners(response.data))
      .catch((e) => console.log(e));
  }

  return (
    <div className="image-container">
      <Slider slides={banners} loading={loading} />
    </div>
  );
};

export default SliderContainer;
