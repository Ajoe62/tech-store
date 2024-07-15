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

  const changeStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3000/api/orders/admin/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
            role: JSON.parse(localStorage.getItem('user')).role,
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
    <div>
      {orders.map((order) => (
        <div key={order.id} className='border p-4 rounded mb-4'>
          <h2 className='text-xl font-bold'>Order #{order.id}</h2>
          <p>Total Amount: ${order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Product: {order.Product.name}</p>

          <div>
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
