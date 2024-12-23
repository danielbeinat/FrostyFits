import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./ProductSlider.scss";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export const ProductSlider = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className="slider-container">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            "--swiper-navigation-size": "15px",
            "--swiper-pagination-fontsize": "10px",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <img loading="lazy" src={product.image} />
          </SwiperSlide>
          <SwiperSlide>
            <img loading="lazy" src={product.image} />
          </SwiperSlide>
          <SwiperSlide>
            <img loading="lazy" src={product.image} />
          </SwiperSlide>
          <SwiperSlide>
            <img loading="lazy" src={product.image} />
          </SwiperSlide>
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          direction="vertical"
        >
          <SwiperSlide>
            <img loading="lazy" src={product.image} />
          </SwiperSlide>
          <SwiperSlide>
            <img loading="lazy" src={product.image} />
          </SwiperSlide>
          <SwiperSlide>
            <img loading="lazy" src={product.image} />
          </SwiperSlide>
          <SwiperSlide>
            <img loading="lazy" src={product.image} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};
