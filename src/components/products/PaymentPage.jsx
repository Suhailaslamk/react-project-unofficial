
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartcontext";
import { toast } from "react-toastify";


export default function PaymentPage() {
  const navigate = useNavigate();
  const { cart, buyNow } = useCart();

  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    await buyNow(); 
    navigate("/order-confirmed", { state: { details, totalAmount } });
    toast.success("Placed Order Succsefully")
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-[#f5f5f0] py-16 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Payment & Shipping</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={details.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={details.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={details.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={details.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={details.zip}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={details.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />

         
          <div className="flex justify-between items-center mt-4 font-semibold text-lg">
            <span>Total:</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}
