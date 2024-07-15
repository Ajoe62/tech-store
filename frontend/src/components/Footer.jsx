const Footer = () => {
  return (
    <footer className='bg-gray-800 p-4 text-white mt-auto'>
      <div className='container mx-auto text-center'>
        &copy; {new Date().getFullYear()} E-Commerce
      </div>
    </footer>
  );
};

export default Footer;
