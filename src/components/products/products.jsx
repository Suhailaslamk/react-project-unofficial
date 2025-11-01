
import { Heart, ShoppingCart } from "lucide-react";
import { useProducts } from "../../context/prodcontxt";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../context/cartcontext";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authcontext";

export default function Products() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { filteredProducts, category, setCategory } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [sortFilter, setSortFilter] = useState(() => localStorage.getItem("sortFilter") || "");
  const [savedCategory, setSavedCategory] = useState(() => localStorage.getItem("category") || category);
  const [search, setSearch] = useState(() => localStorage.getItem("search") || "");
  const navigate = useNavigate();
  const { user } = useAuth();

  const categories = ["All", "Prada", "Tommy Hilfigher", "Louis Vuitton", "Premium"];
  const productsPerPage = 9;

  
  useEffect(() => {
    localStorage.setItem("category", savedCategory);
    setCategory(savedCategory);
  }, [savedCategory]);

  useEffect(() => {
    localStorage.setItem("sortFilter", sortFilter);
  }, [sortFilter]);

  useEffect(() => {
    localStorage.setItem("search", search);
    setSearchParams({ search });
  }, [search]);

  
  let displayedProducts = filteredProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (
        savedCategory === "All" ||
        product.category.toLowerCase() === savedCategory.toLowerCase() ||
        (savedCategory === "Premium" && product.price === 299)
      )
  );

  
  if (sortFilter === "priceLowHigh") displayedProducts.sort((a, b) => a.price - b.price);
  else if (sortFilter === "priceHighLow") displayedProducts.sort((a, b) => b.price - a.price);
  else if (sortFilter === "nameAZ") displayedProducts.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortFilter === "nameZA") displayedProducts.sort((a, b) => b.name.localeCompare(a.name));
  else if (sortFilter === "under199") displayedProducts = displayedProducts.filter((p) => p.price <= 199);
  else if (sortFilter === "under250") displayedProducts = displayedProducts.filter((p) => p.price <= 250);
  else if (sortFilter === "under300") displayedProducts = displayedProducts.filter((p) => p.price <= 300);

  
  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const paginatedProducts = displayedProducts.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, savedCategory, sortFilter]);

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-gray-900 px-4 md:px-16 py-12 mt-16">
      <h1 className="text-4xl md:text-5xl font-[Cinzel] tracking-[0.25em] text-center mb-10">
        Our Collection
      </h1>

     
      <div className="flex flex-wrap justify-center mb-8 gap-4">
       
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSavedCategory(cat)}
              className={`px-4 py-2 rounded-full border text-sm md:text-base transition-all duration-300 ${
                savedCategory === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        
        <div className="flex items-center gap-2 ">
          <span className="text-gray-700 text-sm md:text-base">Sort & Filter:</span>
          <select
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full bg-gray-800 text-white text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
          >
            <option value="">Default</option>
            <optgroup label="Sort by Price">
              <option value="priceLowHigh">Price: Low → High</option>
              <option value="priceHighLow">Price: High → Low</option>
            </optgroup>
            <optgroup label="Sort by Name">
              <option value="nameAZ">Name: A → Z</option>
              <option value="nameZA">Name: Z → A</option>
            </optgroup>
            <optgroup label="Price Range">
              <option value="under199">Under $199</option>
              <option value="under250">Under $250</option>
              <option value="under300">Under $300</option>
            </optgroup>
          </select>
        </div>
      </div>

      
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-5 py-3 rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-800 placeholder-gray-400"
        />
      </div>

      
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            
            <button
              className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white transition z-20"
              onClick={(e) => {
                e.stopPropagation();
                if (user) toggleWishlist(product);
                else navigate("/login");
              }}
              aria-label={user ? "Toggle wishlist" : "Login to add to wishlist"}
            >
              <Heart
                className={`w-5 h-5 transition ${
                  user && isInWishlist(product.id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-700"
                }`}
              />
            </button>

            
            <div className="w-full h-72 overflow-hidden z-10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{product.category || "New Arrival"}</p>
                <p className="text-lg font-medium mt-2">${product.price}</p>
                <p
                  className={`text-sm font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                </p>
              </div>

              
              <div className="flex gap-2 mt-4">
                <button
                  disabled={product.stock <= 0}
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (!user) return navigate("/login");
                    if (product.stock <= 0) return toast.info("Out of stock");

                    const updatedStock = product.stock - 1;
                    try {
                      await axios.patch(`http://localhost:3001/products/${product.id}`, {
                        stock: updatedStock,
                      });
                      product.stock = updatedStock;
                      await addToCart({ ...product, quantity: 1 });
                      toast.success(`Added ${product.name} to cart`);
                    } catch (err) {
                      console.error("Error updating stock:", err);
                    }
                  }}
                  className={`flex items-center gap-2 flex-1 px-4 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                    product.stock <= 0
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  <ShoppingCart size={18} />
                  {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>

                <button
                  disabled={product.stock <= 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product.stock <= 0) return toast.info("Out of stock");
                    navigate(`/products/${product.id}`);
                  }}
                  className={`flex-1 px-4 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                    product.stock <= 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-blue-700"
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      <div className="flex justify-center gap-2 mt-10 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-gray-900 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {displayedProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-16 text-lg">
          No products found matching your criteria.
        </p>
      )}
    </div>
  );
}
