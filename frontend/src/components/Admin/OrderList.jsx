import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/orders/admin/all',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('user')}`,
              role: localStorage.getItem('role'),
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3000/api/orders/admin/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`,
            role: localStorage.getItem('role'),
          },
        }
      );
      const updatedOrders = orders.map((order) => {
        if (order.id === id) {
          return { ...order, status };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>All Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className='border p-4 rounded mb-4'>
          <h2 className='text-xl font-bold'>Order #{order.id}</h2>
          <p>Total Amount: ${order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <p>Quantity: {order.quantity}</p>
          <h3 className='font-bold mt-4'>Products:</h3>
          <ul>
            {order.Products.map((product) => (
              <li key={product.id} className='text-gray-600'>
                {product.name} - ${product.price} (Quantity:{' '}
                {product.OrderProduct.quantity})
              </li>
            ))}
          </ul>
          <div className='mt-4'>
            <button
              onClick={() => changeStatus(order.id, 'completed')}
              className='bg-green-500 text-white px-4 py-2 rounded mr-2'
            >
              Mark as Completed
            </button>
            <button
              onClick={() => changeStatus(order.id, 'cancelled')}
              className='bg-red-500 text-white px-4 py-2 rounded'
            >
              Cancel Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
