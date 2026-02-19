"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
export default function SliderBlock({ data }) {

  const files = data.files || [];
  if (!files.length) return null;

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      slidesPerView={1}
      className="custom-swiper"
    >
      {files.map((file, index) => (
        <SwiperSlide key={index}>
          <img
            src={file.url}
            alt={file.alternativeText || ""}
            className="w-full rounded-3xl"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}