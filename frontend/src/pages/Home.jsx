import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import categories from '../utils/productData';
import Image1 from '@/assets/man.png';
import Image3 from '@/assets/sale.png';
import Footer from '@/components/Footer';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  const handleOrderPopup = () => {
    // Implement order prompt logic
  };

  return (
    <div className='container mx-auto'>
      {/*<img src={Image1} alt='' />*/}
      {/* Hero Section */}
      <div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 mb-8'>
        <div className='container pb-8 sm:pb-0'>
          <div className='flex flex-col sm:flex-row'>
            <div className='w-full sm:w-[40%] p-2'>
              <img
                src={Image3}
                alt='Sale'
                className='w-full h-full object-cover rounded-lg'
              />
            </div>
            {/* Camera image (70% width) */}
            <div className='w-full sm:w-[60%] p-2'>
              <img
                src={Image1}
                alt='Camera'
                className='w-full h-full object-cover rounded-lg'
              />
            </div>
          </div>
          <div className='mt-8 text-center'>
            <button
              onClick={handleOrderPopup}
              className='bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full'
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <CategoryCard categories={categories} />
      {/* Products Section */}
      <h2 className='text-2xl font-bold mb-4'>Products</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer categories={categories} />
    </div>
  );
};

export default Home;
