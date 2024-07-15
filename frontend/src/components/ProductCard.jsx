const ProductCard = ({ product }) => {
  return (
    <div className='border p-4 rounded'>
      <h2 className='text-xl font-bold'>{product.name}</h2>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductCard;
