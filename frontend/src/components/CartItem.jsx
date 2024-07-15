import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div>
      <img src={item.product.image} alt={item.product.name} />
      <h3>{item.product.name}</h3>
      <p>{item.product.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={handleRemoveFromCart}>Remove from Cart</button>
    </div>
  );
};

export default CartItem;
