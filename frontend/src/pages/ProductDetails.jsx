import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.',err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 text-blue-600 hover:underline"
      >
        &larr; Back to products
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img 
            src={`http://localhost:3000${product.imageUrl}`} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-blue-600 font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
              isAdding
                ? 'bg-green-500'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isAdding ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;