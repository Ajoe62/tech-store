import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert('Login successful');
      location.href = '/';
    } catch (error) {
      console.error(error);
      alert('Failed to login');
    }
  };
  if (localStorage.getItem('user')) {
    location.href = '/';
  }
  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
