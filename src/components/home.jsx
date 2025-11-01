import HomeAbout from "./layout/homeabout";
import ShopByCategory from "./layout/shopbycategory";
import Carousal from "./transitions/carousal";




export default function Home() {
  return (
    <div className="pt-16">
       <Carousal />
       <ShopByCategory />

       
<div className="relative w-full h-screen overflow-hidden bg-black">
      
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="https://www.prada.com/content/dam/pradaspa/ecommerce/2025/09/Sunglasses/Man/loop_DT.mp4#t=0.001"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      
      <div className="absolute inset-0 bg-black/40"></div>

      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-6xl md:text-8xl font-[Cinzel] tracking-[0.3em] mb-4">
          DAOR
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 max-w-2xl">
          Elegance in motion — welcome to our world.
        </p>
      </div>
    </div>
  

  


<HomeAbout />

    </div>
  )
}

 
