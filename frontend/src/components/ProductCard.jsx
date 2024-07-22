import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the button
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className='border rounded-lg shadow-md p-4 flex flex-col transition-all duration-300 hover:shadow-lg cursor-pointer'
      onClick={handleCardClick}
    >
      <div className='flex-grow'>
        <div className='overflow-hidden rounded-lg mb-4'>
          <img
            src={`http://localhost:3000${product.imageUrl}`}
            alt={product.name}
            className='w-full h-48 object-cover transition-transform duration-300 hover:scale-105'
          />
        </div>
        <h3 className='text-lg font-semibold mb-2 hover:text-blue-600 transition-colors duration-300'>{product.name}</h3>
        <p className='text-gray-600 mb-2'>
          {product.description.substring(0, 100)}...
        </p>
        <p className='text-xl font-bold text-blue-600'>
          ${product.price.toFixed(2)}
        </p>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`mt-4 px-4 py-2 rounded transition-colors duration-300 ${
          isAdding
            ? 'bg-green-500 text-white'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isAdding ? 'Added!' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;