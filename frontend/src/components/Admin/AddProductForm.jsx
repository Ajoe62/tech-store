import axios from 'axios';
import { useState, useEffect } from 'react';
const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      name,
      description,
      price,
      stockQuantity,
      categoryId,
      imageUrl,
    });
    try {
      await axios.post(
        'http://localhost:3000/api/products',
        {
          name,
          description,
          price,
          stockQuantity,
          categoryId,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`,
            role: localStorage.getItem('role'),
          },
        }
      );
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
    <form
      onSubmit={handleSubmit}
      className='w-1/2 mx-auto mt-10 p-4 border border-gray'
    >
      <div className='mb-4'>
        <label className='block text-sm font-bold mb-2'>Image</label>
        <input
          type='file'
          className='w-full px-3 py-2 border rounded'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>
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
        <label className='block text-sm font-bold mb-2'>Description</label>
        <textarea
          className='w-full px-3 py-2 border rounded'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
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
        <label className='block text-sm font-bold mb-2'>Stock Quantity</label>
        <input
          type='number'
          className='w-full px-3 py-2 border rounded'
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
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
