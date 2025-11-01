
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authcontext";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  console.log("🔹 user from auth context:", user);

  
  if (!user) {
    setLoading(false); 
    return;
  }

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3001/orders?userId=${user.id}`);
      setOrders(res.data);
    } catch (err) {
      console.error(" Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [user]);
  
  if (loading) return <p className="text-center mt-16">Loading orders...</p>;
  if (error) return <p className="text-center mt-16 text-red-600">Error: {error.message}</p>;
  if (!user) return <p className="text-center mt-16">Please log in to view your orders.</p>;
  if (orders.length === 0) return <p className="text-center mt-16">No orders yet.</p>;

  return (
    <div className="min-h-screen px-8 py-10 mt-20 bg-[#f5f5f0]">
      <h1 className="text-3xl font-bold mb-6">📦 Your Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{order.name}</h2>
              <p className="text-gray-500 text-sm">
                Quantity: {order.quantity} | Price: ₹{order.price * order.quantity}
              </p>
              <p className="text-gray-400 text-xs">
                Ordered on: {new Date(order.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
