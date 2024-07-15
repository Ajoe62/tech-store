import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import UserOrders from './pages/UserOrders';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddProduct from './pages/Admin/AddProduct';
import AddCategory from './pages/Admin/AddCategory';
import ViewOrders from './pages/Admin/ViewOrders';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow container mx-auto p-4'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/orders' element={<UserOrders />} />
                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/admin/add-product' element={<AddProduct />} />
                <Route path='/admin/add-category' element={<AddCategory />} />
                <Route path='/admin/view-orders' element={<ViewOrders />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
