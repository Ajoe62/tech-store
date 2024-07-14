const Checkout = () => (
  <div className='container mx-auto mt-8'>
    <h1 className='text-2xl font-bold'>Checkout</h1>
    <form className='mt-4'>
      <div className='mb-4'>
        <label className='block text-gray-700'>Name</label>
        <input type='text' className='w-full p-2 border rounded' />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Address</label>
        <input type='text' className='w-full p-2 border rounded' />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Payment Method</label>
        <select className='w-full p-2 border rounded'>
          <option value='credit-card'>Credit Card</option>
          <option value='paypal'>PayPal</option>
        </select>
      </div>
      <button className='bg-blue-500 text-white p-2 rounded'>
        Place Order
      </button>
    </form>
  </div>
);

export default Checkout;
