import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiURL = "http://localhost:3001";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartRes, wishlistRes] = await Promise.all([
          axios.get(`${apiURL}/cart`),
          axios.get(`${apiURL}/wishlist`),
        ]);
        setCart(cartRes.data);
        setWishlist(wishlistRes.data);
      } catch (err) {
        console.error("Error fetching cart/wishlist:", err);
      }
    };
    fetchData();
  }, []);
  

  const addToCart = async (product, quantity = 1) => {
    if (product.stock !== undefined){
         if( product.stock <= 0){
          toast.error(`${product.name} is out of stock`);
          return 
         }
        }else{

       try{
        const res = await axios.get(`${apiURL}/products/${product.id}`);
      const fullProduct = res.data;


      if (fullProduct.stock <= 0) {
        toast.error(`${fullProduct.name} is out of stock`);
        return;
      } 

       product = fullProduct;

       }catch (err) {
        console.error("Error fetching product data:", err);
      toast.error("Unable to verify product stock");
      return;
    }
  }

    try {
      const existing = cart.find((item) => item.productId === product.id);

      if (existing) {

        const availableStock = product.stock !== undefined ? product.stock : 0;
        const newQuantity = existing.quantity + quantity;


        if (availableStock < quantity ){
          toast.error(`${product.name} is out of stock`)
        }

        const updatedCartEntry ={
          ...existing,
          quantity : newQuantity,
        }

        await axios.put(`${apiURL}/cart/${existing.id}`,updatedCartEntry)

        
  if (product.stock !== undefined) {
    await axios.patch(`${apiURL}/products/${product.id}`, {
      stock: availableStock - quantity,
    });
  }


        // const updatedCartEntry = {
        //   ...existing,
        //   quantity: existing.quantity + quantity,
        // };
      //   await axios.put(`${apiURL}/cart/${existing.id}`, updatedCartEntry);
      //  if(product.stock !== undefined){
      //   await axios.patch(`${apiURL}/products/${product.id}`, {
      //     stock: (product.stock || 0) - quantity,
      //   });
      // }
        setCart((prev) =>
          prev.map((item) =>
            item.id === existing.id ? updatedCartEntry : item
          )
        );
        toast.success(`${product.name} quantity updated in cart!`);
  return;
}
       
      

      const cartEntry = {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        ...(product.stock !== undefined && { stock: product.stock }),
        quantity,
      };

      const res = await axios.post(`${apiURL}/cart`, cartEntry);
      if(product.stock !== undefined){
      await axios.patch(`${apiURL}/products/${product.id}`, {
        stock: (product.stock || 0) - quantity,
      });
    }

      setCart((prev) => [...prev, res.data]);
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  const clearCart = () => {
    setCart([]);
    setWishlist([]);
  };

  const removeFromCart = async (cartEntryId) => {
    try {
      const cartItem = cart.find((item) => item.id === cartEntryId);
      if (!cartItem) return;

      const productId = cartItem.productId || cartItem.id;

      const productRes = await axios.get(`${apiURL}/products/${productId}`);
      const product = productRes.data;

      await axios.patch(`${apiURL}/products/${productId}`, {
        stock: (product.stock || 0) + (cartItem.quantity || 1),
      });

      await axios.delete(`${apiURL}/cart/${cartEntryId}`);

      setCart((prev) => prev.filter((item) => item.id !== cartEntryId));
      toast.info(` Removed ${cartItem.name} from cart`);
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Failed to remove item from cart");
    }
  };

  const increaseQuantity = async (productId) => {
    const item = cart.find((c) => c.productId === productId);
    if (!item) return;

    const productRes = await axios.get(`${apiURL}/products/${productId}`);
    const product = productRes.data;

    if ((product.stock || 0) <= 0) {
      toast.error(" Out of stock");
      return;
    }

    const updatedItem = { ...item, quantity: item.quantity + 1 };
    await axios.put(`${apiURL}/cart/${cartEntryId}`, updatedItem);

    await axios.patch(`${apiURL}/products/${productId}`, {
      stock: product.stock - 1,
    });

    setCart((prev) =>
      prev.map((c) => (c.productId === productId? updatedItem : c))
    );
  };

  const decreaseQuantity = async (cartEntryId) => {
    const item = cart.find((c) => c.id === cartEntryId);
    if (!item) return;

    const productRes = await axios.get(`${apiURL}/products/${item.productId}`);
    const product = productRes.data;

    if (item.quantity === 1) {
      await removeFromCart(cartEntryId);
      return;
    }

    const updatedItem = { ...item, quantity: item.quantity - 1 };
    await axios.put(`${apiURL}/cart/${item.id}`, updatedItem);

    await axios.patch(`${apiURL}/products/${item.productId}`, {
      stock: (product.stock || 0) + 1,
    });

    setCart((prev) =>
      prev.map((c) => (c.id === cartEntryId ? updatedItem : c))
    );
  };

  const toggleWishlist = async (product) => {
    try {
      const exists = wishlist.find((item) => item.productId === product.id);
      if (exists) {
        await axios.delete(`${apiURL}/wishlist/${exists.id}`);
        setWishlist((prev) => prev.filter((item) => item.id !== exists.id));
        toast.info(` Removed ${product.name} from wishlist`);
      } else {
        const wishlistEntry = {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        };
        const res = await axios.post(`${apiURL}/wishlist`, wishlistEntry);
        setWishlist((prev) => [...prev, res.data]);
        toast.success(` Added ${product.name} to wishlist`);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      toast.error("Failed to update wishlist");
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`${apiURL}/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const buyNow = async (userId) => {
    try {
      for (const item of cart) {
        const productRes = await axios.get(
          `${apiURL}/products/${item.productId}`
        );
        const product = productRes.data;

        await axios.patch(`${apiURL}/products/${item.productId}`, {
          stock: (product.stock || 0) - item.quantity,
        });

        await axios.post(`${apiURL}/orders`, {
          userId,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          date: new Date().toISOString(),
        });

        await axios.delete(`${apiURL}/cart/${item.id}`);
      }

      setCart([]);
      toast.success(" Purchase successful!");
    } catch (err) {
      console.error("Error buying items:", err);
      toast.error("Failed to complete purchase");
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const wishlistCount = wishlist.length;

  const isInCart = (id) => {
    return cart.some((item) => {
      console.log(item.productId, id);
      return item.productId ===id
    });
  };
  // const isInCart =(id)=> {
  //   cart.some((item) => item.productId === id )
  //   console.log(id,cart)
  // }

  const isInWishlist = (id) => wishlist.some((item) => item.productId === id);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        toggleWishlist,
        removeFromCart,
        removeFromWishlist,
        increaseQuantity,
        decreaseQuantity,
        buyNow,
        loading,
        cartCount,
        wishlistCount,
        isInCart,
        isInWishlist,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
