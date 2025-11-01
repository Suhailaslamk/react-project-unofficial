// import { motion } from "framer-motion";

// export default function About() {
//   return (
//     <div className="min-h-screen bg-[#f5f5f0] text-gray-900 mt-16">
     
//       <section className="relative h-[60vh] flex flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center text-center">
//         <div className="absolute inset-0 bg-black/50"></div>
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="relative z-10 max-w-2xl text-white px-6"
//         >
//           <h1 className="text-5xl font-[Cinzel] mb-4 tracking-widest">About Daor</h1>
//           <p className="text-lg leading-relaxed">
//             Where timeless design meets modern sophistication.
//           </p>
//         </motion.div>
//       </section>

      
//       <section className="py-20 px-6 md:px-20">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="max-w-4xl mx-auto text-center"
//         >
//           <h2 className="text-3xl font-[Cinzel] mb-6 tracking-widest">Our Mission</h2>
//           <p className="text-lg text-gray-700 leading-relaxed">
//             At <span className="font-semibold">Daor</span>, we believe in creating more than
//             just fashion — we create experiences. Our goal is to redefine elegance by
//             merging classic craftsmanship with a modern edge, ensuring every piece tells
//             a story of confidence, sustainability, and innovation.
//           </p>
//         </motion.div>
//       </section>

      
//       <section className="bg-white py-20 px-6 md:px-20">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <img
//               src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80"
//               alt="Luxury fashion"
//               className="rounded-3xl shadow-lg"
//             />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl font-[Cinzel] mb-6 tracking-widest">Our Story</h2>
//             <p className="text-lg text-gray-700 leading-relaxed mb-4">
//               Daor began as a passion project — a vision to bring luxury within reach,
//               while keeping ethical fashion at the forefront. Inspired by European
//               minimalism and bold modern aesthetics, every design reflects the pursuit
//               of balance between elegance and innovation.
//             </p>
//             <p className="text-lg text-gray-700 leading-relaxed">
//               From our first atelier to global recognition, our commitment has remained
//               the same: to celebrate individuality, craftsmanship, and timeless style.
//             </p>
//           </motion.div>
//         </div>
//       </section>

      
//       <section className="py-20 px-6 md:px-20 bg-[#f9f9f6]">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="max-w-6xl mx-auto text-center"
//         >
//           <h2 className="text-3xl font-[Cinzel] mb-12 tracking-widest">Meet the Team</h2>

//           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
//             {[
//               {
//                 name: "Ava Loren",
//                 role: "Creative Director",
//                 img: "https://randomuser.me/api/portraits/women/32.jpg",
//               },
//               {
//                 name: "Noah Jensen",
//                 role: "Head of Design",
//                 img: "https://randomuser.me/api/portraits/men/35.jpg",
//               },
//               {
//                 name: "Liam Carter",
//                 role: "Brand Strategist",
//                 img: "https://randomuser.me/api/portraits/men/45.jpg",
//               },
//             ].map((member) => (
//               <motion.div
//                 key={member.name}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white rounded-2xl shadow-md p-6"
//               >
//                 <img
//                   src={member.img}
//                   alt={member.name}
//                   className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
//                 />
//                 <h3 className="text-xl font-semibold">{member.name}</h3>
//                 <p className="text-gray-500">{member.role}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </section>

      
//       <footer className="py-12 bg-gray-900 text-white text-center">
//         <p className="text-lg italic font-light">
//           “Elegance is when the inside is as beautiful as the outside.” – Coco Chanel
//         </p>
//       </footer>
//     </div>
//   );
// }
















import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <div ref={ref} className="min-h-screen bg-[#f8f8f3] text-gray-900 mt-16 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex flex-col justify-center items-center text-center bg-[#f8f8f3]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-[Cinzel] tracking-[0.25em] uppercase mb-6"
        >
          Daor
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl italic text-gray-700"
        >
          Sunglasses — where man spends.
        </motion.p>
      </section>

      {/* SCROLL MOTION IMAGES */}
      <section className="relative flex justify-between items-center px-10 md:px-20 py-32 bg-[#f5f5f0]">
        <motion.img
          style={{ y: y1 }}
          src="https://www.prada.com/content/dam/pradabkg_products/U/UGM/UGM389/18VCF0308/UGM389_18VC_F0308_S_AAO_MDF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2000.2000.jpg"
          alt="Model wearing sunglasses"
          className="w-[40%] h-[80vh] object-cover rounded-2xl shadow-xl"
        />
        <motion.img
          style={{ y: y2 }}
          src="https://www.prada.com/content/dam/pradabkg_products/U/UGM/UGM389/18VCF0308/UGM389_18VC_F0308_S_AAO_MDB.jpg/_jcr_content/renditions/cq5dam.web.hebebed.2000.2000.jpg"
          alt="Luxury eyewear"
          className="w-[40%] h-[80vh] object-cover rounded-2xl shadow-xl"
        />
      </section>

      {/* MISSION / STORY SECTION */}
      <section className="py-24 px-6 md:px-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-[Cinzel] mb-8 tracking-widest">
            The Vision Behind Daor
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            <span className="font-semibold">Daor Sunglasses</span> embodies timeless
            masculinity — bold, deliberate, and precise. Each frame is crafted with an
            obsession for detail, blending classic craftsmanship and modern refinement.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-6">
            We don’t follow trends; we define presence. Every pair tells a story — of
            power, poise, and purpose.
          </p>
        </motion.div>
      </section>

      {/* FOOTER QUOTE */}
      <footer className="py-20 bg-gray-950 text-white text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl italic font-light"
        >
          “Elegance is not about being noticed, it’s about being remembered.”
        </motion.p>
        <p className="mt-6 text-sm uppercase tracking-widest text-gray-400">
          Daor Sunglasses
        </p>
      </footer>
    </div>
  );
}
