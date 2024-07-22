import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import categories from '../utils/productData';
import Image1 from '@/assets/man.png';
import Image3 from '@/assets/sale.png';
import Footer from '@/components/Footer';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOrderPopup = () => {
    // Implement order prompt logic
    console.log('Order Now clicked');
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className='container mx-auto px-4'>
      {/* Hero Section */}
      <div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 mb-8 rounded-lg'>
        <div className='container pb-8 sm:pb-0'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='w-full sm:w-[40%]'>
              <img
                src={Image3}
                alt='Sale'
                className='w-full h-full object-cover rounded-lg shadow-lg'
              />
            </div>
            <div className='w-full sm:w-[60%]'>
              <img
                src={Image1}
                alt='Camera'
                className='w-full h-full object-cover rounded-lg shadow-lg'
              />
            </div>
          </div>
          <div className='mt-8 text-center'>
            <button
              onClick={handleOrderPopup}
              className='bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md'
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <CategoryCard categories={categories} />
      {/* Products Section */}
      <h2 className='text-3xl font-bold mb-6'>Products</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </div>
      <Footer categories={categories} />
    </div>
  );
};

export default Home;