const Footer = ({ categories }) => {
  return (
    <footer className='bg-gray-800 text-white mt-auto'>
      <div className='container mx-auto px-4 py-16'>
        <h2 className='text-3xl font-bold mb-8'>Featured Categories</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {categories.map((category) => (
            <>
              {category.id >= 5 ? null : (
                <div
                  key={category.id}
                  className='bg-gray-700 rounded-lg shadow-md overflow-hidden'
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-4'>
                    <h3 className='font-semibold text-lg text-white'>
                      {category.name}
                    </h3>
                  </div>
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
