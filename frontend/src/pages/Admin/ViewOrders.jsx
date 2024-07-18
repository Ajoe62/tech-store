import OrderList from '../../components/Admin/OrderList';

const ViewOrders = () => {
  if (localStorage.getItem('role') !== 'admin') {
    window.location.href = '/';
    alert('Access denied');
  }
  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>View Orders</h1>
      <OrderList />
    </div>
  );
};

export default ViewOrders;
