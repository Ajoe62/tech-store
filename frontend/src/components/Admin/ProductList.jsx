import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);
  const onDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`,
        role: localStorage.getItem('role'),
      },
    });
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
  };
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className='border p-4 rounded mb-4'>
          <h2 className='text-xl font-bold'>{product.name}</h2>
          <p>${product.price}</p>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={() => {
              onDelete(product.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
