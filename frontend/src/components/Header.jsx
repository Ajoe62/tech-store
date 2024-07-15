import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const Header = () => {
  const { logout } = useContext(AuthContext);
  return (
    <header className='bg-gray-800 p-4 text-white'>
      <div className='container mx-auto flex justify-between'>
        <Link to='/' className='text-xl font-bold'>
          Tech-Store
        </Link>
        <nav>
          <Link to='/cart' className='mr-4'>
            Cart
          </Link>
          {localStorage.getItem('user') &&
            JSON.parse(localStorage.getItem('user')).role === 'admin' && (
              <Link to='/admin' className='mr-4'>
                Admin
              </Link>
            )}
          {localStorage.getItem('user') ? (
            <>
              <Link to='/profile' className='mr-4'>
                Profile
              </Link>
              <button onClick={logout}>Logout</button>

              <Link to='/orders' className='ml-4'>
                Orders
              </Link>
            </>
          ) : (
            <>
              <Link to='/register' className='mr-4'>
                Register
              </Link>
              <Link to='/login'>Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
