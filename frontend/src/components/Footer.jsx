import React from 'react';
import githubIcon from '../assets/github.png';
import twitterIcon from '../assets/x.png';
import linkedinIcon from '../assets/linkedin.png';
import facebookIcon from '../assets/facebook.png';
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
        <div className='mt-16 flex justify-center'>
        <div className='bg-gray-700 rounded-full px-8 py-4 flex items-center'>
          <a href='https://github.com/Mohanned-sameh/tech-store' target='_blank' rel='noopener noreferrer' className='hover:opacity-80 transition duration-300'>
            <img src={githubIcon} alt="GitHub" className="w-6 h-6" />
          </a>
          <a href='https://twitter.com/Web_with_Joe' target='_blank' rel='noopener noreferrer' className='hover:opacity-80 transition duration-300 ml-5'>
            <img src={twitterIcon} alt="Twitter" className="w-6 h-6" />
          </a>
          <a href='https://www.facebook.com/mohanned-sameh' target='_blank' rel='noopener noreferrer' className='hover:opacity-80 transition duration-300 ml-5'>
            <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
          </a>
          <a href='https://www.linkedin.com/in/akharumejoseph' target='_blank' rel='noopener noreferrer' className='hover:opacity-80 transition duration-300 ml-5'>
            <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
          </a>
        </div>
      </div>
      </div>
      <div className='container mx-auto text-center py-4 border-t border-gray-700'>
        &copy; {new Date().getFullYear()} Tech-Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
