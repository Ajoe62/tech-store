const Footer = ({ categories }) => {
  return (
    <footer className='bg-gray-800 text-white mt-20'>
      <div className='container mx-auto px-4 py-16'>
        <h2 className='text-3xl font-bold mb-8'>Featured Categories</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {categories.map((category) => (
            <>
              {category.id >= 5 ? null : (
                <div key={category._id}>
                  <h3 className='text-xl font-bold mb-4'>{category.name}</h3>
                  <img
                    src={`http://localhost:3000${category.image}`}
                    alt={category.name}
                    className='w-full h-48 object-cover mb-4'
                  />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      <div className='container mx-auto text-center py-4'>
        &copy; {new Date().getFullYear()} Tech-Store
      </div>
    </footer>
  );
};

export default Footer;
