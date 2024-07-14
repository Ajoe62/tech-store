import { Link } from 'react-router-dom';

const Header = () => (
  <header className='bg-gray-800 text-white p-4'>
    <div className='container mx-auto flex justify-between'>
      <Link to='/' className='text-xl font-bold'>
        Tech Store
      </Link>
      <nav>
        <Link to='/cart' className='mr-4'>
          Cart
        </Link>
        <Link to='/login'>Login</Link>
      </nav>
    </div>
  </header>
);

export default Header;
