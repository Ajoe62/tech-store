import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, totalAmount } = useContext(CartContext);

  if (cartItems.length === 0)
    return <div className='container mx-auto mt-8'>Your cart is empty</div>;

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-2xl font-bold'>Cart</h1>
      <div className='mt-4'>
        {cartItems.map((item) => (
          <div key={item.id} className='flex justify-between border-b py-4'>
            <div>
              <h2 className='font-bold'>{item.name}</h2>
              <p className='text-gray-600'>
                ${item.price} x {item.quantity}
              </p>
            </div>
            <p className='text-gray-600'>${item.price * item.quantity}</p>
          </div>
        ))}
        <div className='flex justify-between mt-4'>
          <h2 className='text-xl font-bold'>Total</h2>
          <p className='text-xl'>${totalAmount}</p>
        </div>
        <button className='mt-4 bg-blue-500 text-white p-2 rounded'>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
