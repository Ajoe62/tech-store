import { Link } from 'react-router-dom';
export default function Notfound() {
  return (
    <div className='flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-800'>404</h1>
        <p className='text-2xl text-gray-600'>Page Not Found</p>
        <Link to='/' className='text-blue-500 mt-2'>
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
