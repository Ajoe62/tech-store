import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className='border rounded p-4'>
    <img
      src={product.image}
      alt={product.name}
      className='w-full h-48 object-cover'
    />
    <h2 className='mt-2 font-bold'>{product.name}</h2>
    <p className='mt-1 text-gray-600'>${product.price}</p>
    <Link
      to={`/product/${product.id}`}
      className='block mt-2 bg-blue-500 text-white p-2 rounded text-center'
    >
      View Details
    </Link>
  </div>
);

export default ProductCard;
