import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch product details');
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/products/${id}`, {
        name,
        description,
        price,
        category,
      });
      alert('Product updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update product');
    }
  };
  if (!localStorage.getItem('user')) {
    window.location.href = '/login';
    alert('You need to login first');
  }

  if (localStorage.getItem('role') !== 'admin') {
    window.location.href = '/';
    alert('You are not authorized');
  }
  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Name</label>
          <input
            type='text'
            className='w-full px-3 py-2 border rounded'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Description</label>
          <textarea
            className='w-full px-3 py-2 border rounded'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Price</label>
          <input
            type='number'
            className='w-full px-3 py-2 border rounded'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Category</label>
          <input
            type='text'
            className='w-full px-3 py-2 border rounded'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
