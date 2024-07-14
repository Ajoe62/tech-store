import { useState } from 'react';
import api from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });
      console.log(response.data); // Handle login success
    } catch (error) {
      console.error(error); // Handle login error
    }
  };

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
