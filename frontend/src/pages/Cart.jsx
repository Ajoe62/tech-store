import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div>
      <h1 className='text-2xl font-bold'>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => <CartItem key={item.product.id} item={item} />)
      )}

      <div className='flex justify-end mt-4'>
        <p className='mr-4'>
          Total:{' '}
          {cart.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          )}
        </p>
        {cart.length > 0 && (
          <>
            <Link to='/checkout' className='btn btn-primary mr-4'>
              Checkout
            </Link>
            <button className='btn btn-secondary' onClick={handleClearCart}>
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
