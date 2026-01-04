import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import { getBanners } from "@/lib/api";

const Hero = async () => {
  const banners = await getBanners();

  return (
    <section className="overflow-hidden pb-10 pt-30 bg-[#E5EAF4]">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="relative rounded-[10px] bg-white overflow-hidden">
          <Image
            src="/images/hero/hero-bg.png"
            alt="hero bg shapes"
            className="absolute right-0 bottom-0 -z-1"
            width={534}
            height={520}
          />

          <HeroCarousel banners={banners} />
        </div>
      </div>

      <HeroFeature />
    </section>
  );
};

export default Hero;
