"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";

interface Banner {
  id?: number;
  imageUrl: string;
  linkUrl: string;
}

interface Props {
  banners: Banner[];
}

const fallbackBanners: Banner[] = [
  {
    imageUrl: "/images/hero/hero-01.png",
    linkUrl: "#",
  },
];

const HeroCarousel = ({ banners }: Props) => {
  const data = banners.length ? banners : fallbackBanners;

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
      modules={[Autoplay, Navigation, Pagination]}
      className="hero-carousel"
    >
      {data.map((banner, index) => (
        <SwiperSlide key={banner.id ?? index}>
          <Link href={banner.linkUrl}>
            <div className="cursor-pointer flex justify-center">
              <Image
                src={banner.imageUrl}
                alt="Banner"
                width={1200}
                height={450}
                className="object-cover w-full h-auto"
                priority={index === 0}
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;
