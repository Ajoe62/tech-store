import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`,
          role: localStorage.getItem('role'),
        },
      });
      const newProducts = products.filter((product) => product.id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200'>
        <thead className='bg-gray-100 border-b'>
          <tr>
            <th className='px-6 py-3 text-left text-gray-600'>Id</th>
            <th className='px-6 py-3 text-left text-gray-600'>Name</th>
            <th className='px-6 py-3 text-left text-gray-600'>Price</th>
            <th className='px-6 py-3 text-left text-gray-600'>Category</th>
            <th className='px-6 py-3 text-left text-gray-600'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className='border-b hover:bg-gray-50'>
              <td className='px-6 py-4 text-gray-800'>{product.id}</td>
              <td className='px-6 py-4 text-gray-800'>{product.name}</td>
              <td className='px-6 py-4 text-gray-800'>${product.price}</td>
              <td className='px-6 py-4 text-gray-800'>{product.categoryId}</td>
              <td className='px-6 py-4'>
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition'
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
