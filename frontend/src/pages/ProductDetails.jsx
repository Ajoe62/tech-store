import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>{product.name}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
