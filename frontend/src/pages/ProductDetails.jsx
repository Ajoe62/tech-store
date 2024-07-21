import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // try fetching from API
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        console.error('API fetch failed:', err);
        //If API fails, use local data
        const localProducts = localProducts.find((p) => p.id === parseInt(id));
        if (localProducts) {
          setProduct(localProducts);
        } else {
          setError('Product not found');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col md:flex-row'>
        <img
          src={`http://localhost:3000${product.imageUrl}`}
          alt={product.name}
          className='w-full md:w-1/2'
        />
        <div>
          <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
          <p className='text-2xl font-semibold text-blue-600 mb-4'>
            ${product.price.toFixed(2)}
          </p>
          <p className='text-gray-700 mb-4'>{product.description}</p>
          <p className='text-gray-600'>Category: {product.category}</p>
          <button className='mt-4 bg-green-500 text-white px-4 py-2 rounded'>
            Add to Cart
          </button>
          <button
            onClick={() => navigate(-1)}
            className='mb-4 bg-blue-500 text-white px-4 py-2 rounded ml-4'
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
