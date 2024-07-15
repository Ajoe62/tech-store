import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Cart</h1>
      {cart.map((item) => (
        <CartItem key={item.product.id} item={item} />
      ))}
    </div>
  );
};

export default Cart;
