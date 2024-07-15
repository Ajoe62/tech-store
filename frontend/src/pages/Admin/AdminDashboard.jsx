import { Link } from 'react-router-dom';
import ProductList from '../../components/Admin/ProductList';
const AdminDashboard = () => {
  if (!localStorage.getItem('user')) {
    location.href = '/login';
  }
  if (JSON.parse(localStorage.getItem('user')).role !== 'admin') {
    location.href = '/';
  }
  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <nav>
        <Link to='/admin/add-product' className='mr-4'>
          Add Product
        </Link>
        <Link to='/admin/add-category' className='mr-4'>
          Add Category
        </Link>
        <Link to='/admin/view-orders' className='mr-4'>
          View Orders
        </Link>
        <Link to='/admin/view-products'>View Products</Link>
      </nav>
      <div className='my-4'>
        <ProductList />
      </div>
    </div>
  );
};

export default AdminDashboard;
