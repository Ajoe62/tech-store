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

import cctv from '@/assets/cctv.jpg';
import headphone from '@/assets/headphone.jpg';
import iphone from '@/assets/iphone.avif';
import lighting_keyboard from '@/assets/lighting_keyboard.jpg';
import mobile_tech from '@/assets/mobile_tech.avif';
import pc from '@/assets/pc.jpg';
import phones from '@/assets/phones.jpg';
import router from '@/assets/router.avif';
import smart_watch from '@/assets/smart_watch.jpg';
import tablet from '@/assets/tablet.jpg';
import watch from '@/assets/watch.jpg';


const categories = [
  { id: 1, name: "CCTV", image: cctv },
  { id: 2, name: "Headphones", image: headphone },
  { id: 3, name: "Smartphones", image: iphone },
  { id: 4, name: "Keyboards", image: lighting_keyboard },
  { id: 5, name: "Mobile Tech", image: mobile_tech },
  { id: 6, name: "PCs", image: pc },
  { id: 7, name: "Phones", image: phones },
  { id: 8, name: "Networking", image: router },
  { id: 9, name: "Smart Watches", image: smart_watch },
  { id: 10, name: "Tablets", image: tablet },
  { id: 11, name: "Watches", image: watch }
];

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
            <Footer categories={categories}/>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
