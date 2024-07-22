const OrderItem = ({ order }) => {
  return (
    <div className='border border-gray-200 p-4 mb-4'>
      <h2 className='text-xl font-bold mb-2'>Order ID: {order.id}</h2>
      <div className='flex justify-between items-center mb-2'>
        <p className='text-gray-600'>Total: ${order.totalAmount}</p>
        <p className='text-gray-600'>Status: {order.status}</p>
      </div>
      <div className='flex justify-between items-center'>
        <p className='text-gray-600'>
          Date: {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className='mt-4'>
        <h3 className='text-lg font-bold mb-2'>Products:</h3>
        {order.Products && order.Products.length > 0 ? (
          order.Products.map((product) => (
            <div key={product.id} className='border border-gray-200 p-2 mb-2'>
              <p className='font-semibold'>{product.name}</p>
              <p className='text-gray-600'>Price: ${product.price}</p>
              <p className='text-gray-600'>
                Quantity: {product.OrderProduct.quantity}
              </p>
              <img
                src={`http://localhost:3000${product.imageUrl}`}
                alt={product.name}
                className='w-16 h-16 object-cover'
              />
            </div>
          ))
        ) : (
          <p className='text-gray-600'>No products in this order</p>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
