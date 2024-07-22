import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);
  const { product, quantity } = item;

  const handleRemoveFromCart = () => {
    removeFromCart(item.product.id);
  };
  return (
    <div className='flex items-center border-b-2 border-gray-200 py-4'>
      <img
        src={`http://localhost:3000${product.imageUrl}`}
        alt={product.name}
        className='w-16 h-16 object-cover rounded'
      />
      <div className='flex-1 ml-4'>
        <h3 className='font-bold'>{product.name}</h3>
        <p className='text-gray-500'>${product.price}</p>
        <p>Quantity: {quantity}</p>
      </div>
      <button
        className='text-red-500 font-semibold'
        onClick={handleRemoveFromCart}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
