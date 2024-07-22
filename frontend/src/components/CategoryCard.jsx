const CategoryCard = ({ categories }) => {
  return (
    <>
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
    </>
  );
};

export default CategoryCard;
