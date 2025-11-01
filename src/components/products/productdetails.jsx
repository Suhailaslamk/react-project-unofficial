
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/prodcontxt";
import { useCart } from "../../context/cartcontext";
import { useAuth } from "../../context/authcontext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, buyNow, toggleWishlist, cart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = products.find((p) => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      setSelectedImage(found.image);
    } else {
      axios
        .get(`http://localhost:3001/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          setSelectedImage(res.data.image);
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id, products]);

  if (!product)
    return <p className="text-center text-gray-600 p-10">Loading product...</p>;

  const imageList = [
    product.image,
    product.image1,
    product.image2,
    product.image3,
    product.hover,
  ].filter(Boolean);

  const handleAddToCart = async () => {
    if (!user) {
      toast.info("Please login to add items to cart!");
      navigate("/login");
      return;
    }

    if (quantity > product.stock) {
      toast.error("Cannot add more than available stock!");
      return;
    }

    try {
      await addToCart(product, quantity);

      const updatedStock = product.stock - quantity;
      setProduct({ ...product, stock: updatedStock });

      await axios.patch(`http://localhost:3001/products/${product.id}`, {
        stock: updatedStock,
      });

      toast.success(`${quantity} item(s) added to cart`);
      setQuantity(1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWishlist = () => {
    if (!user) {
      toast.info("Please login to add items to wishlist!");
      navigate("/login");
      return;
    }
    toggleWishlist(product);
  };

  const cartItem = cart.find((c) => c.productId === product.id);
  const inCartQty = cartItem?.quantity || 0;

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-gray-900 flex flex-col lg:flex-row gap-10 px-8 md:px-20 py-16 mt-10">
      <div className="lg:w-1/2 flex gap-4">
        <div className="hidden md:flex flex-col gap-3 overflow-y-auto h-[80vh] pr-2">
          {imageList.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product ${index}`}
              onClick={() => setSelectedImage(img)}
              className={`w-24 h-24 object-cover rounded-xl cursor-pointer border ${
                selectedImage === img
                  ? "border-gray-900"
                  : "border-transparent hover:border-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full max-h-[80vh] object-cover rounded-3xl shadow-md"
          />
        </div>
      </div>

      <div className="lg:w-1/2 flex flex-col justify-start lg:sticky lg:top-24 space-y-6">
        <h1 className="text-4xl font-[Cinzel]">{product.name}</h1>
        <p className="text-gray-500 text-lg">{product.category}</p>
        <p className="text-3xl font-semibold">${product.price}</p>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <div className="flex items-center gap-4">
          <p className="text-gray-600 text-sm">
            Stock:{" "}
            <span
              className={`font-semibold ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-gray-700 text-sm">Quantity:</label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-20 text-center border border-gray-300 rounded-md py-1"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`flex-1 py-3 rounded-full transition ${
              product.stock <= 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {inCartQty > 0 ? `${inCartQty} in cart` : "Add to Cart"}
          </button>

          <button
            onClick={handleWishlist}
            disabled={product.stock <= 0}
            className={`flex-1 py-3 rounded-full border transition ${
              product.stock <= 0
                ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-white border-gray-900 text-gray-900 hover:bg-gray-100"
            }`}
          >
            Add To Wishlist
          </button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 py-2 px-4 border rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Go back
        </button>
      </div>
    </div>
  );
}

