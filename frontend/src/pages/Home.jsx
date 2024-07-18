import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import productData from '../utils/productData';
import ProductCard from '../components/ProductCard';
import Image1 from "@/assets/sale.png";
import Image2 from "@/assets/tab.jpg";
import Image3 from "@/assets/cctv.jpg";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 50% off on purchase above $100",
    description:
      "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: Image2,
    title: "30% off on all Gadgets",
    description:
      "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: Image3,
    title: "70% off on all Products Sale",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const {categories} = productData

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
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
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  const handleOrderPopup = () => {
    // Implement order prompt logic
  };

  return (
    <div className='container mx-auto'>
      <img src={Image1} alt="" />
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 mb-8">
        <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
        <div className="container pb-8 sm:pb-0">
          <Slider {...settings}>
            {ImageList.map((data) => (
              <div key={data.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">{data.title}</h1>
                    <p className="text-sm">{data.description}</p>
                    <div>
                      <button
                        onClick={handleOrderPopup}
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                  <div className="order-1 sm:order-2">
                    <div className="relative z-10">
                      <img
                        src={data.img}
                        alt=""
                        className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Categories Section */}
      <h2 className='text-2xl font-bold mb-4'>Categories</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{category.name}</h3>
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
    </div>
  );
};

export default Home;