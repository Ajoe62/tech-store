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
    <div>
      <h1 className='text-2xl font-bold'>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.product.id}>
            <img src={item.product.image} alt={item.product.name} />
            <h3>{item.product.name}</h3>
            <p>{item.product.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      )}

      <div className='flex justify-end mt-4'>
        <p className='mr-4'>
          Total:{' '}
          {cart.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          )}
        </p>
      </div>

      <div className='flex justify-end mt-4'>
        <button className='btn btn-primary' onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
