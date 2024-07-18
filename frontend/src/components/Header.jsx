import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png'
import cart_Icon from '../assets/cart_icon.png'
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  //calculate total items in cart
  const CartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className='bg-gray-800 p-4 text-white'>
      <div className='container mx-auto flex justify-between item-center'>
        <Link to='/' className='text-xl font-bold'>
        <div className="bg-white rounded-full p-1 flex items-center justify-center h-8 w-8">
          <img src={logo} alt="Logo" className='h-7 w-7' />
          </div>
        </Link>
        <nav className='flex items-center'>
          <Link to='/cart' className='mr-4 relative'>
          <div className="bg-white rounded-full p-1 flex items-center justify-center h-8 w-8">
            <img src={cart_Icon} alt="Cart" className='h-5 w-5' />
            </div>
            {CartItemCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
            {CartItemCount}</span>
            )}
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
