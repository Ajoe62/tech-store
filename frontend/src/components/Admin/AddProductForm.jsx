import axios from 'axios';
import { useState, useEffect } from 'react';
const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', { name, price, categoryId });
      alert('Product added successfully');
      setName('');
      setPrice('');
      setCategoryId('');
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label className='block text-sm font-bold mb-2'>Product Name</label>
        <input
          type='text'
          className='w-full px-3 py-2 border rounded'
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <select
          className='w-full px-3 py-2 border rounded'
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value=''>Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type='submit'
        className='px-4 py-2 bg-blue-500 text-white rounded'
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
