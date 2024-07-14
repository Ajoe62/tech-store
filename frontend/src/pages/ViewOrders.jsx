import { useEffect, useState } from 'react';
import axios from 'axios';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch orders');
      }
    };
    fetchOrders();
  }, []);
  if (!localStorage.getItem('user')) {
    window.location.href = '/login';
    alert('You need to login first');
  }

  if (localStorage.getItem('role') !== 'admin') {
    window.location.href = '/';
    alert('You are not authorized');
  }
  return (
    <div className='mx-auto'>
      <h2 className='text-xl font-bold ml-4 mb-4'>Orders</h2>
      <table className='w-full table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Order ID</th>
            <th className='px-4 py-2'>Total Amount</th>
            <th className='px-4 py-2'>Quantity</th>
            <th className='px-4 py-2'>Status</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className='border px-4 py-2'>{order.id}</td>
              <td className='border px-4 py-2'>{order.totalAmount}</td>
              <td className='border px-4 py-2'>{order.quantity}</td>
              <td className='border px-4 py-2'>{order.status}</td>
              <td className='border px-4 py-2'>
                <button
                  className='bg-blue-500 text-white px-4 py-2 rounded'
                  onClick={() => updateOrderStatus(order.id, 'completed')}
                >
                  Mark as Completed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const updateOrderStatus = async (orderId, status) => {
  try {
    await axios.put(`/api/orders/${orderId}`, { status });
    alert('Order status updated');
  } catch (error) {
    console.error(error);
    alert('Failed to update order status');
  }
};

export default ViewOrders;
