import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";


export default function UserDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();

  
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex justify-center items-center px-4 py-16 mt-16">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">User Details</h1>
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {user.name || "-"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user.phone || "-"}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {user.address || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
