



import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Carousel() {
  const slides = [
    {
      id: 1,
      img: "https://images.ctfassets.net/brzb6u29244a/11NPeQef1taVMI5MKMbvxy/3a7c64552176ca5f6404ca6ae4072e47/HeroCategory-Desktop_Gucci-FW25-JULY25-250604-19-064-2-w1_001_Default.png?w=4000&fm=avif&q=50",
      title: "Luxury screams",
      desc: "Discover the elegance of Daor — where design meets timeless craftsmanship.",
    },
    {
      id: 2,
      img: "https://india.ray-ban.com/media/wysiwyg/Rb_sunglasses_clp_opti/07_Sunglasses_Page_Hero_Banner_Desktop_-_1920x800px.jpg",
      title: "Shades of life",
      desc: "Immerse yourself in our exclusive new collection.",
    },
    {
      id: 3,
      img: "https://static.zara.net/assets/public/45fd/c6eb/ea804bb4b737/a568225f3d37/02750300808-a3/02750300808-a3.jpg?ts=1752751272175&w=750",
      title: "Where man spends",
      desc: "Luxury that speaks your story — only at Daor.",
    },
  ];

  return (
    <div className="w-full h-[90vh] md:h-[85vh] sm:h-[70vh] relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        effect="fade"
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center justify-center text-center text-white">
              
              
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              
              <div className="absolute inset-0 bg-black/60" />

              
              <div className="relative z-10 px-6 sm:px-4">
                <h2 className="text-5xl md:text-4xl sm:text-2xl font-[Cinzel] tracking-[0.2em] mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="max-w-2xl mx-auto text-lg sm:text-sm text-slate-300 drop-shadow-md">
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
