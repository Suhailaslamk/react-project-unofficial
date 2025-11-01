import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminContext = createContext()
export const useAdmin =()=> useContext(AdminContext)

export const AdminProvider = ({children}) => {
    const [products,setProducts] =useState([])
    const [users,setUsers]=useState([])
    const [orders,setOrders]=useState([])

    const apiURL = "http://localhost:3001"

    const fetchProducts = async ()=> {
        try {
            const res = await axios.get(`${apiURL}/products`)
            setProducts(res.data)
            
            
           
            
        } catch (err){
            console.log(err)
        }
    
    }



    const fetchUsers = async ()=>{
        try{
        const res=await axios.get(`${apiURL}/users`)
        setUsers(res.data)
    }catch(err){
        console.log(err);
        
    }
}

const addProduct = async (product) =>{
    try {
        const res = await axios.post(`${apiURL}/products`,product)
        setProducts((prev)=> {[...prev,res.data]})

       
        toast.success("Product added!")
    }catch (err){
        toast.error("Failed to add product")
    }
    }

    const deleteProduct= async (id)=> {
        try {

            await axios.delete(`${apiURL}/products/${id}`)
            setProducts((prev)=> prev.filter((p)=> p.id !== id))
            toast.info("Product deleted")
        }catch(err){
            toast.error("failed to delete product")
        }
        }
 
       
        const editProduct=async (id,updatedData)=>{
          try{
            const res = await axios.patch(`${apiURL}/products/${id}`,updatedData);
            setProducts((prev)=> 
            prev.map((p) => (p.id === id ? res.data : p)))
            toast.success("Product updated")
          }catch(err){
            console.log(err);
            toast.error("Failed to update product")
    
          }
   
          }

          const fetchOrders= async ()=>{
             try{
                const res=await axios.get(`${apiURL}/orders`)
             setOrders(res.data)
             
             
             }catch(err){
                console.log(err);
                
             }
          }
          const deleteOrders=async (id)=> {
            try{
                 await axios.delete(`${apiURL}/orders/${id}`)
                 setOrders((prev)=>  prev.filter((o)=> o.id !== id))
                 toast.info("order deleted")
            }catch(err){
                console.log(err);
                toast.error("failed to delete order")
            }
          }

          const updateOrderStatus=async (id,status)=>{
               try{
                const res= await axios.patch(`${apiURL}/orders/${id}`,{status})
                setOrders((prev)=> prev.map((o)=> (o.id === id ? {...o,status : res.data.status} : o)))

               toast.success("Order status updated!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update order status");
    }
  };






        useEffect(()=> {
            fetchProducts()
            fetchUsers()
            fetchOrders()
        },[])

        return (
            <AdminContext.Provider 
            value={{
                products,
                users,
                fetchProducts,
                fetchUsers,
                addProduct,
                deleteProduct,
                editProduct,
                orders,
                deleteOrders,
                updateOrderStatus,

            }}>{children}
            </AdminContext.Provider>
        )
    }


