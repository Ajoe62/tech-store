import { useState } from 'react';
import axios from 'axios';

const AddCategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:3000/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('user')}`,
          role: localStorage.getItem('role'),
        },
      });
      alert('Category added successfully');
      setName('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label className='block text-sm font-bold mb-2'>Category Image</label>
        <input
          type='file'
          className='w-full px-3 py-2 border rounded'
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-bold mb-2'>Category Name</label>
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
      <button
        type='submit'
        className='px-4 py-2 bg-blue-500 text-white rounded'
      >
        Add Category
      </button>
    </form>
  );
};

export default AddCategoryForm;
