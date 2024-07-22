import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderItem from '../components/OrderItem';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        },
      });
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Your Orders</h1>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default UserOrders;
