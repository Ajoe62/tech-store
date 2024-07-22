import { Link } from 'react-router-dom';
import ProductList from '../../components/Admin/ProductList';

const AdminDashboard = () => {
  if (!localStorage.getItem('user')) {
    location.href = '/login';
  }
  if (localStorage.getItem('role') !== 'admin') {
    window.location.href = '/';
  }

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='container mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800'>Admin Dashboard</h1>
        </div>
        <div className='flex flex-wrap justify-center gap-4 mb-8'>
          <Link
            to='/admin/add-product'
            className='bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition'
          >
            Add Product
          </Link>
          <Link
            to='/admin/add-category'
            className='bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition'
          >
            Add Category
          </Link>
          <Link
            to='/admin/view-orders'
            className='bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition'
          >
            Orders
          </Link>
        </div>
        <div className='bg-white shadow-md rounded-lg p-6'>
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
