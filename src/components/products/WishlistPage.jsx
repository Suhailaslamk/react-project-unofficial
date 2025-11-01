import { useEffect } from "react";
import { useAuth } from "../../context/authcontext";
import { useCart } from "../../context/cartcontext";
import { useNavigate } from "react-router-dom";


export default function WishlistPage() {
  const navigate=useNavigate()
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const{user}=useAuth()
useEffect(()=> {
  if(!user)
    navigate('/')
},[user,navigate])
  return (
    <div className="min-h-screen bg-[#f5f5f0] px-8 py-10 mt-16">
      <h1 className="text-3xl font-bold mb-6"> Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-lg">No items in your wishlist.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow">
              <img src={item.image} alt={item.name} className="w-full h-56 object-cover rounded-lg" />
              <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => addToCart({
                    id : item.productId,
                     name : item.name,
                      price : item.price,
                      image: item.image,
                  })
          }
                  className="flex-1 bg-black text-white px-3 py-2 rounded-md hover:bg-gray-800"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
