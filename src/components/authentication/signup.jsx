import React, { useState ,useEffect} from 'react'
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authcontext';



export default function Signup() {
    const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const { signup, error,user } = useAuth();
  const navigate = useNavigate();
    

  const handleSignup = async (e) => {
    e.preventDefault();


     if (!username || !email || !password || !confirmPassword) {
      setLocalError("All fields are required.");
      return;
    }


     if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

setLocalError("");
    const success = await signup(username, email, password);
    if (success) navigate("/login");
  };

   
  useEffect(()=> {
    if(user)
      navigate('/')
  },[user,navigate])


   return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4  ">
        <motion.div
        initial={{opacity: 0, y: 40}}
        animate={{opacity: 1, y: 0}}
        transition={{ duration: 0.8 }}
        className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-[0_0_40px_rgba(255,255,255,0.05)]">

           



          <h2 className="text-5xl text-center font-[Cinzel] tracking-[0.3em] text-slate-100 mb-8">
          Daor
        </h2> 
         <form onSubmit={handleSignup} className="space-y-6">
           
           <div>
            <label className="block text-slate-300 text-sm mb-2">Full Name</label>
            <input 
            type="text"
            
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-slate-100 rounded-lg focus:outline-none border border-gray-700 focus:border-slate-400 transition-all duration-300" />
            </div>


          
          <div>
            <label className="block text-slate-300 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-slate-100 rounded-lg focus:outline-none border border-gray-700 focus:border-slate-400 transition-all duration-300"
            />
            </div>

 

<div>
    <label  className="block text-slate-300 text-sm mb-2" >Password</label>
    <input 
    type="password"
    
    value={password}
    onChange={(e)=> setPassword(e.target.value)}
    className="w-full px-4 py-3 bg-gray-800 text-slate-100 rounded-lg focus:outline-none border border-gray-700 focus:border-slate-400 transition-all duration-300" />
</div>






          <div>
            <label className="block text-slate-300 text-sm mb-2">Confirm Password</label>
            <input
              type="password"
             
              value={confirmPassword}
              onChange={(e)=> setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-800 text-slate-100 rounded-lg focus:outline-none border border-gray-700 focus:border-slate-400 transition-all duration-300"
            />
          </div>


          {(localError || error) && (
            <p className="text-red-400 text-sm text-center">{localError || error}</p>
          )}






          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full mt-4 bg-white text-gray-900 py-3 rounded-full font-semibold tracking-wide hover:bg-slate-100 transition-colors duration-300"
          onClick={()=> {
            if (!username || !email || !password || !confirmPassword) {
                  setLocalError("All fields are required.")
                return }else{
  navigate('/login')}}
                }
          
            
               >
            Sign Up
          </motion.button>
        </form>


         
        <div className="text-center mt-6 text-slate-400 text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
} 




