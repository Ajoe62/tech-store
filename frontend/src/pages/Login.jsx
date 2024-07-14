import { useState } from 'react';
import api from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });

      localStorage.setItem('token', response.data.token, { expires: 1 });
      window.location.href = '/';
    } catch (error) {
      console.error(error); // Handle login error
    }
  };

  if (localStorage.getItem('token')) {
    window.location.href = '/';
    alert('You are already logged in');
  }

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-2xl font-bold'>Login</h1>
      <form onSubmit={handleSubmit} className='mt-4'>
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
          <label className='block text-gray-700'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>
        <button className='bg-blue-500 text-white p-2 rounded'>Login</button>
      </form>
    </div>
  );
};

export default Login;
