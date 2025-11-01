import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-10 w-full max-w-lg text-center shadow-[0_0_40px_rgba(255,255,255,0.05)]"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[6rem] leading-none font-extrabold text-slate-100 font-[Cinzel]"
        >
          404
        </motion.h1>

        <h2 className="text-2xl text-slate-200 font-semibold tracking-[0.2em] mb-4">
          Page Not Found
        </h2>

        <p className="text-slate-400 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Go Back Home
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
}
