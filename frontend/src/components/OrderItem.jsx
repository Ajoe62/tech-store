const OrderItem = ({ order }) => {
  return (
    <div className='border p-4 rounded'>
      <h2 className='text-xl font-bold'>Order #{order.id}</h2>
      <p>Total Amount: ${order.totalAmount}</p>
      <p>Status: {order.status}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Product: {order.Product.name}</p>
    </div>
  );
};

export default OrderItem;
