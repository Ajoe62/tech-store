const CartItem = ({ item }) => {
  return (
    <div className='border p-4 rounded'>
      <h2 className='text-xl font-bold'>{item.product.name}</h2>
      <p>Quantity: {item.quantity}</p>
      <p>${item.product.price}</p>
    </div>
  );
};

export default CartItem;
