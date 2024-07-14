import { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('/admin/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      <div className='mt-4 grid grid-cols-4 gap-4'>
        {products.map((product) => (
          <div key={product.id} className='border rounded p-4'>
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-48 object-cover'
            />
            <h2 className='mt-2 font-bold'>{product.name}</h2>
            <p className='mt-1 text-gray-600'>${product.price}</p>
            <button className='mt-2 bg-red-500 text-white p-2 rounded'>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
