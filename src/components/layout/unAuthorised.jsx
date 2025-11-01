import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-10 w-full max-w-lg text-center shadow-[0_0_40px_rgba(255,255,255,0.05)]"
      >
        <Lock size={60} className="text-red-400 mx-auto mb-4" />
        <h1 className="text-3xl font-[Cinzel] text-slate-100 mb-4">
          Unauthorized Access
        </h1>
        <p className="text-slate-400 mb-6">
          You don’t have permission to view this page.
        </p>
        <NavLink
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Back to Home
        </NavLink>
      </motion.div>
    </div>
  );
}
