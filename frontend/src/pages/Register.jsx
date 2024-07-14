import { useState } from 'react';
import api from '../utils/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
        address,
      });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  if (localStorage.getItem('token')) {
    window.location.href = '/';
    alert('You are already logged in');
  }

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-2xl font-bold'>Register</h1>
      <form onSubmit={handleSubmit} className='mt-4'>
        <div className='mb-4'>
          <label className='block text-gray-700'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Address</label>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>
        <button className='bg-blue-500 text-white p-2 rounded'>Register</button>
      </form>
    </div>
  );
};

export default Register;
