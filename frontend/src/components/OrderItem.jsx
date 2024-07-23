const OrderItem = ({ order }) => {
  return (
    <div className='border p-4 mb-4 rounded shadow'>
      <h2 className='text-xl font-bold mb-2'>Order #{order.id}</h2>
      <p className='text-gray-600'>Status: {order.status}</p>
      <p className='text-gray-600'>Total Amount: ${order.totalAmount}</p>
      <p className='text-gray-600'>Quantity: {order.quantity}</p>
      <h3 className='text-lg font-bold mt-4'>Products:</h3>
      <ul>
        {order.Products.map((product) => (
          <li key={product.id} className='text-gray-600'>
            {product.name} - ${product.price} (Quantity:{' '}
            {product.OrderProduct.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItem;
