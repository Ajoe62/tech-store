import { Link, Route, Routes } from 'react-router-dom';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ViewOrders from './ViewOrders';

const AdminDashboard = () => {
  if (!localStorage.getItem('user')) {
    window.location.href = '/login';
    alert('You need to login first');
  }

  if (localStorage.getItem('role') !== 'admin') {
    window.location.href = '/';
    alert('You are not authorized');
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <nav className='mb-4'>
        <ul className='flex space-x-4'>
          <li>
            <Link to='/admin/add-product'>Add Product</Link>
          </li>
          <li>
            <Link to='/admin/edit-product'>Edit Product</Link>
          </li>
          <li>
            <Link to='/admin/view-orders'>View Orders</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/edit-product' element={<EditProduct />} />
        <Route path='/view-orders' element={<ViewOrders />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
