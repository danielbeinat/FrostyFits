import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

import "./ProductSlider.scss";

import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";

export const ProductSlider = ({ product }) => {
  const [thumbsSwiper, setThimsSwiper] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const mainSwiperRef = useRef(null);

  // Generate multiple images for demo (in real app, these would come from product.images)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.activeIndex);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleThumbnailClick = (index) => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index);
    }
  };

  return (
    <motion.div
      className="product-slider-modern"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Image Slider */}
      <div className="main-slider-container">
        <Swiper
          ref={mainSwiperRef}
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            "--swiper-navigation-size": "24px",
          }}
          spaceBetween={0}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          zoom={{
            maxRatio: 3,
            minRatio: 1,
            toggle: true,
          }}
          modules={[FreeMode, Navigation, Thumbs, Zoom]}
          className="main-product-slider"
          onSlideChange={handleSlideChange}
          allowTouchMove={!isZoomed}
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index} className="product-slide">
              <div className="swiper-zoom-container">
                <motion.img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className="product-image"
                  loading={index === 0 ? "eager" : "lazy"}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Image overlay with zoom hint */}
                <motion.div
                  className="image-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ZoomIn className="w-6 h-6" />
                  <span className="text-sm font-medium">Click para zoom</span>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <motion.button
          className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Zoom Toggle Button */}
        <motion.button
          onClick={handleZoomToggle}
          className="zoom-toggle-button absolute top-4 right-4 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isZoomed ? (
            <ZoomOut className="w-5 h-5" />
          ) : (
            <ZoomIn className="w-5 h-5" />
          )}
        </motion.button>

        {/* Slide Counter */}
        <div className="slide-counter absolute bottom-4 left-4 z-20 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-sm font-medium">
            {currentSlide + 1} / {productImages.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Slider */}
      <div className="thumbnail-slider-container">
        <Swiper
          onSwiper={setThimsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          direction="vertical"
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbnail-slider"
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index} className="thumbnail-slide">
              <motion.div
                className="thumbnail-wrapper"
                onClick={() => handleThumbnailClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-image"
                  loading="lazy"
                />

                {/* Active indicator */}
                <AnimatePresence>
                  {currentSlide === index && (
                    <motion.div
                      className="active-indicator"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Thumbnail Slider */}
      <div className="mobile-thumbnail-slider">
        <Swiper
          spaceBetween={8}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mobile-thumbnails"
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index} className="mobile-thumbnail-slide">
              <motion.div
                className={`mobile-thumbnail-wrapper ${currentSlide === index ? "active" : ""}`}
                onClick={() => handleThumbnailClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image}
                  alt={`Mobile Thumbnail ${index + 1}`}
                  className="mobile-thumbnail-image"
                  loading="lazy"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
};
