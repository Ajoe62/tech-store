import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/auth/profile',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('user')}`,
            },
          }
        );
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          address: response.data.address,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData({ name: user.name, email: user.email, address: user.address });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        'http://localhost:3000/api/auth/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`,
          },
        }
      );
      setUser(response.data);
      window.location.reload();
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!localStorage.getItem('user')) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className='container mx-auto p-4'>
      {loading ? (
        <h1 className='text-2xl font-semibold'>Loading...</h1>
      ) : (
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          {editMode ? (
            <>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='name'
                >
                  Name
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='name'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-6'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-6'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='address'
                >
                  Address
                </label>
                <textarea
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='address'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className='flex items-center justify-between'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='button'
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='button'
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className='text-2xl font-bold mb-2'>{user.name}</h1>
              <p className='text-gray-700 mb-4'>{user.email}</p>
              <p className='text-gray-700 mb-4'>{user.address}</p>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
                onClick={handleEdit}
              >
                Edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
