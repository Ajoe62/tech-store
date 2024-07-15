import { useState } from 'react';
import axios from 'axios';

const AddCategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/categories', { name });
      alert('Category added successfully');
      setName('');
    } catch (error) {
      console.error(error);
      alert('Failed to add category');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
