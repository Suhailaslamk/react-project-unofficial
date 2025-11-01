import axios from "axios";
import { createContext, useState,useContext, useEffect } from "react";

 const AuthContext = createContext();

export const AuthProvider =({children}) => {


    const [user,setUser]=useState(null)
    const [error,setError]=useState("")



 useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);




    const signup = async (username, email, password) => {
        if(!username || !password || !email){
            setError("Invalid email or password.");
            return false
        }

       try{
         const existing = await axios.get(
            `http://localhost:3001/users?email=${email}`
         )

         if (existing.data.length > 0){
            setError("User already exists. Try logging in.");
            return false;
         }


         const res= await axios.post("http://localhost:3001/users",{
            username,
            email,
            password,
         })

        setUser(res.data)
        setError("")
        return true;

       } catch (err){
        console.error("Signup error:", err.message)
        setError("Signup failed. Try again.");
         return false;
       }
    }



    const login=async (email,password)=>{
        try{
            const res=await axios.get(
                `http://localhost:3001/users?email=${email}&password=${password}`
            )

            if(res.data.length > 0){
                 const loggedUser = res.data[0];
               setUser(loggedUser);
               localStorage.setItem("user", JSON.stringify(loggedUser)); 
      setError("");
                return true;
            }else{
                setError("Invalid email or password.");
        return false;

            }
        } catch (err){
             console.error("Login error:", err.message);
      setError("Login failed. Try again.");
      return false;
        }
    }
       

    const logout =()=> {
        setUser(null)
        localStorage.removeItem("user");
       
    }




return (

    <AuthContext.Provider 
    value={{user,login,logout,signup,error }} >
    {children}

    </AuthContext.Provider>
)
}
export const useAuth = () => useContext(AuthContext);