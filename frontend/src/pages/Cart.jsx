import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h1 className='text-2xl font-bold'>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => <CartItem key={item.product.id} item={item} />)
      )}
    </div>
  );
};

export default Cart;
