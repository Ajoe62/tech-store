import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <header className='bg-gray-800 text-white p-4'>
      <div className='container mx-auto flex justify-between'>
        <Link to='/' className='text-xl font-bold'>
          Tech Store
        </Link>
        <nav>
          <Link to='/cart' className='mr-4'>
            Cart
          </Link>
          {localStorage.getItem('user') ? (
            <>
              <Link className='mr-5' to='/profile'>
                Profile
              </Link>
              <button onClick={() => logout()}>Logout</button>
            </>
          ) : (
            <>
              <Link className='mr-5' to='/register'>
                Register
              </Link>
              <Link to='/login'>Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
