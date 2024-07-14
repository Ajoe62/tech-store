import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/product/:id' element={<ProductDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
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
