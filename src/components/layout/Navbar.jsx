
import { NavLink, useNavigate } from "react-router-dom";
import { Heart, User, Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/authcontext";
import { useCart } from "../../context/cartcontext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount, wishlistCount,clearCart } = useCart();

  const handleLogout = () => {
    logout();
    clearCart()
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="w-full h-[70px] bg-gray-900 text-slate-200 flex items-center justify-between px-8 md:px-16 shadow-md fixed top-0 left-0 z-50">
      
      <div className="hidden md:flex space-x-10 text-lg font-light tracking-wide">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-white font-medium" : "hover:text-gray-400"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "text-white font-medium" : "hover:text-gray-400"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-white font-medium" : "hover:text-gray-400"
          }
        >
          About
        </NavLink>
      </div>

      
      <div
        className="text-4xl md:text-5xl font-[Cinzel] tracking-[0.25em] cursor-pointer"
        onClick={() => navigate("/")}
      >
        Daor
      </div>

      
      <div className="hidden md:flex items-center space-x-6 relative">
        
        <button
          className="relative p-2 hover:scale-110 transition-transform"
          onClick={() => navigate("/wishlist")}
        >
          <Heart className="w-6 h-6 text-white hover:text-red-500 transition" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

       
        <button
          className="relative p-2 hover:scale-110 transition-transform"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="w-6 h-6 text-white hover:text-gray-300 transition" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              {cartCount}
            </span>
          )}
        </button>

        
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:scale-110 transition-all duration-300"
            >
              <User size={18} /> Hey {user.username}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border rounded shadow-lg z-50">
                <button
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-600 "
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/user-details");
                  }}
                >
                  User Details
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-600 "
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/orders-page");
                  }}
                >
                  My Orders
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-600 "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="flex items-center gap-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:scale-110 transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            <User size={18} /> Login
          </button>
        )}
      </div>

      
      <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
        <Menu size={28} />
      </button>

      
      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-gray-900 text-center flex flex-col space-y-4 py-6 text-lg font-light z-50">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setIsOpen(false)}>
            Products
          </NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>
            About
          </NavLink>

          <div className="flex justify-center gap-6 pt-4">
            
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/wishlist");
              }}
            >
              <Heart className="w-6 h-6 text-white" />
              {wishlistCount > 0 && (
                <span className="absolute bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center -mt-6 ml-3">
                  {wishlistCount}
                </span>
              )}
            </button>

            
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/cart");
              }}
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute bg-white text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center -mt-6 ml-3">
                  {cartCount}
                </span>
              )}
            </button>

            
            {user ? (
              <button
                className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-100 transition-all duration-300"
                onClick={() => {
                  setIsOpen(false);
                  logout();
                  navigate("/login");
                }}
              >
                <User size={18} /> Logout
              </button>
            ) : (
              <button
                className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-100 transition-all duration-300"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/login");
                }}
              >
                <User size={18} /> Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
