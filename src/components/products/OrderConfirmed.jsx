


import { useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmed() {
  const location = useLocation();
  const navigate = useNavigate();

 
  const { details, totalAmount } = location.state || {};

  if (!details) {
    
    navigate("/products");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f5f5f0] px-4 py-16">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4"> Order Confirmed!</h1>
        <p className="text-gray-700 mb-6">
          Thank you, <span className="font-semibold">{details.name}</span>, for your purchase.
        </p>

        <div className="text-left mb-6 space-y-2">
          <p><span className="font-semibold">Email:</span> {details.email}</p>
          <p><span className="font-semibold">Phone:</span> {details.phone}</p>
          <p><span className="font-semibold">Address:</span> {details.address}, {details.city} - {details.zip}</p>
          <p><span className="font-semibold">Total Paid:</span> ₹{totalAmount}</p>
        </div>

        <button
          onClick={() => navigate("/products")}
          className="mt-4 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
