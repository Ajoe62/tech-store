import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import cart_Icon from '@/assets/cart_icon.png';

const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);

  const handleClearCart = () => {
    clearCart();
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (!localStorage.getItem('user')) {
    location.href = '/login';
    alert('You need to login first');
  }

  return (
    <div>
      <div className='flex items-center mb-4'>
        <img src={cart_Icon} alt='Cart' className='w-8 h-8 mr-2' />
        <h1 className='text-2xl font-bold'>Your Cart</h1>
        {totalItems > 0 && (
          <span className='ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs'>
            {totalItems}
          </span>
        )}
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}

          <div className='flex justify-between items-center mt-4'>
            <p className='text-xl font-semibold'>
              Total: ${totalPrice.toFixed(2)}
            </p>
            <div>
              <Link to='/checkout' className='btn btn-primary mr-4'>
                Checkout
              </Link>
              <button className='btn btn-secondary' onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
