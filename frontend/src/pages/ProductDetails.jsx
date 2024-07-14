import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className='container mx-auto mt-8'>
      <div className='flex'>
        <img
          src={product.image}
          alt={product.name}
          className='w-1/2 h-96 object-cover'
        />
        <div className='ml-8'>
          <h1 className='text-2xl font-bold'>{product.name}</h1>
          <p className='mt-4 text-gray-600'>{product.description}</p>
          <p className='mt-4 text-xl'>${product.price}</p>
          <button className='mt-4 bg-blue-500 text-white p-2 rounded'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
