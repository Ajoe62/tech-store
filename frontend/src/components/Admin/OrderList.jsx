import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        'http://localhost:3000/api/orders/admin/all',
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
            role: JSON.parse(localStorage.getItem('user')).role,
          },
        }
      );
      setOrders(response.data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className='border p-4 rounded mb-4'>
          <h2 className='text-xl font-bold'>Order #{order.id}</h2>
          <p>Total Amount: ${order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Product: {order.Product.name}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
