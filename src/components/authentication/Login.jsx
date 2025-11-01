"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink,useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";





 export default function Login() {
  
  const[email,setEmail]=useState("")
   const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
    
   const { login, error,user } = useAuth();
const navigate = useNavigate();

  
  
const handleLogin = async (e) => {
  e.preventDefault();
  setLocalError("")
    
   

 if (!email || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    const success = await login(email, password);
    if (success && user) {
      if(user.role === "admin"){
      navigate("/admin"); 
    } else {
      navigate('/');
    }
  }else{
      setLocalError("Invalid email or password.")
    }
  };

   useEffect(()=> {
  if(user){
    if(user.role === "admin"){
       navigate("/admin");
    }else{
       navigate("/");
    }
  }
},[user,navigate])





  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
       <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-[0_0_40px_rgba(255,255,255,0.05)]">




          


<h2 className="text-5xl text-center font-[Cinzel] tracking-[0.3em] text-slate-100 mb-8">
          Daor
        </h2>

        


       <form onSubmit={handleLogin} className="space-y-6">


         


       <div>
        <label className="block text-slate-300 text-sm mb-2">Email</label>
        <input 

        type="email"
       
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        className="w-full px-4 py-3 bg-gray-800 text-slate-100 rounded-lg focus:outline-none border border-gray-700 focus:border-slate-400 transition-all duration-300"
            />
       </div>

       
       <div> 
       <label className="block text-slate-300 text-sm mb-2">Password</label>
       <input 
       type="password"
      
       value={password}
       onChange={(e)=> setPassword(e.target.value)}
       className="w-full px-4 py-3 bg-gray-800 text-slate-100 rounded-lg focus:outline-none border border-gray-700 focus:border-slate-400 transition-all duration-300"
       />
</div>


       
          {(localError || error) && (
            <p className="text-red-400 text-sm text-center">
              {localError || error}
            </p>
          )}

       

        



          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full mt-4 bg-white text-gray-900 py-3 rounded-full font-semibold tracking-wide hover:bg-slate-100 transition-colors duration-300"
          >Login
          </motion.button>
        </form>

        
        
        
        

        <div className="text-center mt-6 text-slate-400 text-sm space-y-2">
          <p>
            Don't have an account?{" "}
            <NavLink to="/signup"  className="text-white hover:underline">
            Sign up</NavLink>
          </p>

          <NavLink to="#" className="text-slate-400 hover:text-white text-sm">Forgot Password?</NavLink>

        </div>
        </motion.div>
      

    </div>
  )
}
