import { Link } from 'react-router-dom';

const CategoryCard = ({ categories }) => {
  return (
    <section className='my-8'>
      <h2 className='text-3xl font-bold mb-6'>Categories</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className='bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group'
          >
            <div className='overflow-hidden'>
              <img
                src={`http://localhost:3000${category.image}`}
                alt={category.name}
                className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <div className='p-4'>
              <h3 className='font-semibold text-lg group-hover:text-blue-600 transition-colors duration-300'>
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryCard;
