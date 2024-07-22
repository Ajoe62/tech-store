import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryList = () => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/categories/${id}`
      );
      setCategory(response.data);
      setProduct(response.data.Products);
    } catch (error) {
      console.error('Error fetching category:', error);
      setError('Failed to fetch category. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!category) {
    return <p>No category found.</p>;
  }

  return (
    <section className='my-8'>
      <h2 className='text-3xl font-bold mb-6'>{category.name}</h2>
      <div className='mb-6'>
        <img
          src={`http://localhost:3000${category.image}`}
          alt={category.name}
          className='w-full h-48 object-cover'
        />
        <p className='mt-4'>{category.description}</p>
      </div>
      <h3 className='text-2xl font-bold mb-4'>Products</h3>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {product.map((product) => (
          <div key={product.id} className='border p-4 rounded-lg'>
            <Link to={`/product/${product.id}`}>
              <img
                src={`http://localhost:3000${product.imageUrl}`}
                alt={product.name}
                className='w-full h-48 object-cover mb-4'
              />
              <h4 className='text-xl font-bold'>{product.name}</h4>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
