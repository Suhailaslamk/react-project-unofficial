
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartcontext";
import { useEffect } from "react";
import { useAuth } from "../../context/authcontext";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const {user} = useAuth()
useEffect(()=> {
  if(!user)
    navigate('/')
},[user,navigate])
  
  const totalAmount = cart.reduce(
    (sum, item) => sum + ((Number(item.price) || 0) * (item.quantity || 1)),
    0
  );

  return (
    <div className="min-h-screen bg-[#f5f5f0] px-8 py-10 mt-16">
      <h1 className="text-3xl font-bold mb-6"> Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={entry.image}
                    alt={entry.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{entry.name}</h2>
                    <p>${entry.price}</p>
                  </div>
                </div>

               
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(entry.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-2">{entry.quantity || 1}</span>
                    <button
                      onClick={() => increaseQuantity(entry.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(entry.id)}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

       
          <div className="mt-6 p-4 bg-white rounded shadow flex justify-between items-center max-w-md">
            <h2 className="text-xl font-semibold">Total:</h2>
            <p className="text-lg font-semibold">₹{totalAmount}</p>
          </div>

         
          <button
            onClick={() => navigate("/payment")}
            className="mt-4 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
            Buy Now
          </button>
        </>
      )}
    </div>
  );
}
