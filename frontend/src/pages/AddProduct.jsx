import { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/products', {
        name,
        description,
        price,
        category,
      });
      alert('Product added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
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
    <div className='container mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Add Product</h2>
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
