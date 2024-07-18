import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        address,
        password,
      });
      window.location.href = '/login';
      alert('Registration successful');
    } catch (error) {
      console.error(error);
      alert('Failed to register');
    }
  };

  if (localStorage.getItem('user')) {
    location.href = '/';
  }
  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Register</h1>
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
          <label className='block text-sm font-bold mb-2'>Email</label>
          <input
            type='email'
            className='w-full px-3 py-2 border rounded'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Address</label>
          <input
            type='text'
            className='w-full px-3 py-2 border rounded'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Password</label>
          <input
            type='password'
            className='w-full px-3 py-2 border rounded'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
