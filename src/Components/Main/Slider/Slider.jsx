import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "/src/assets/banner1.webp";
import banner2 from "/src/assets/banner2.webp";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.scss";

import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

export const Slider = () => {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-size": "15px",
          "--swiper-pagination-fontsize": "10px",
        }}
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img loading="lazy" src={banner1} />
        </SwiperSlide>
        <SwiperSlide>
          <img loading="lazy" src={banner2} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
