
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Store } from './MyPages/Store';
import { StoreCategory } from './MyPages/StoreCategory';
import { Product } from './MyPages/Product';
import { LoginSignup } from './MyPages/LoginSignup';
import { Cart } from './MyPages/Cart';
import { Footer } from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Store/>}/>
        <Route path='/gadgets' element={<StoreCategory category="gadgets"/>}/>
        <Route path='/computings' element={<StoreCategory category="computings"/>}/>
        <Route path='/home appliances' element={<StoreCategory category="home appliances"/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={Product}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
