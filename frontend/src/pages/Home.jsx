import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import productData from '../utils/productData';
import ProductCard from '../components/ProductCard';
import Image1 from '@/assets/man.png';
import Image2 from '@/assets/cctv.jpg';
import Image3 from '@/assets/sale.png';
import Footer from '../components/Footer';

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
import tab from '@/assets/tab.jpg';
import pad from '@/assets/pad.avif';
import pc_splash from '@/assets/pc_splash.jpg';
import monitor from '@/assets/monitor.jpg';
import tablets from '@/assets/tablets.webp';



const categoriesImages = [
  { id: 1, name: 'CCTV', image: cctv },
  { id: 2, name: 'Headphones', image: headphone },
  { id: 3, name: 'Smartphones', image: iphone },
  { id: 4, name: 'Keyboards', image: lighting_keyboard },
  { id: 5, name: 'Mobile Tech', image: mobile_tech },
  { id: 6, name: 'PCs', image: pc },
  { id: 7, name: 'Phones', image: phones },
  { id: 8, name: 'Networking', image: router },
  { id: 9, name: 'Smart Watches', image: smart_watch },
  { id: 10, name: 'Tablets', image: tablet },
  { id: 11, name: 'Watches', image: watch },
  { id: 11, name: 'Tab', image: tab },
  { id: 11, name: 'Pad', image: pad },
  { id: 11, name: 'Pc_splash', image: pc_splash },
  { id: 11, name: 'Monitor', image: monitor },
  { id: 11, name: 'Tablets', image: tablets },
];

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: 'Upto 50% off on purchase above $100',
    description:
      'lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    img: Image2,
    title: '30% off on all Gadgets',
    description:
      "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: Image3,
    title: '70% off on all Products Sale',
    description:
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const { categories } = productData;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(productData.products);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'ease-in-out',
    pauseOnHover: false,
    pauseOnFocus: true,
  };

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
      <h2 className='text-2xl font-bold mb-4'>Categories</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        {categories.map((category) => (
          <div
            key={category.id}
            className='bg-white rounded-lg shadow-md overflow-hidden'
          >
            <img
              src={category.image}
              alt={category.name}
              className='w-full h-48 object-cover'
            />
            <div className='p-4'>
              <h3 className='font-semibold text-lg'>{category.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Products Section */}
      <h2 className='text-2xl font-bold mb-4'>Products</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer categories={categoriesImages} />
    </div>
  );
};

export default Home;
