import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/api/orders',
        {
          totalAmount: cart.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          ),
          quantity: cart.reduce((acc, item) => acc + item.quantity, 0),
          productId: cart.map((item) => item.product.id),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`,
          },
        }
      );

      alert('Order placed successfully');
      clearCart();
      location.href = '/orders';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-3xl font-bold mb-6'>Checkout</h2>
      <div className='w-full md:w-1/2'>
        <h3 className='text-2xl font-bold mb-4'>Order Summary</h3>
        <div className='border-t-2 border-b-2 border-gray-200'>
          {cart.map((item) => (
            <div
              key={item.product.id}
              className='flex items-center justify-between py-4 border-b-2'
            >
              <div className='flex items-center'>
                <img
                  src={`http://localhost:3000${item.product.imageUrl}`}
                  alt={item.product.name}
                  className='w-16 h-16 object-cover rounded'
                />
                <div className='ml-4'>
                  <h3 className='font-bold'>{item.product.name}</h3>
                  <p className='text-gray-500'>${item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <p>${item.product.price * item.quantity}</p>
            </div>
          ))}
        </div>
        <div className='flex justify-between mt-4'>
          <h3 className='font-bold'>Total</h3>
          <p>
            $
            {cart.reduce(
              (acc, item) => acc + item.product.price * item.quantity,
              0
            )}
          </p>
        </div>
        <button
          onClick={handlePlaceOrder}
          className='bg-green-500 text-white font-semibold py-2 px-4 mt-6'
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
