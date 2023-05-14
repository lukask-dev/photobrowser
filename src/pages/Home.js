import React, { useState } from 'react';
import Thumbnails from '../components/Thumbnails';
import PageNumberInput from '../components/PageNumberInput';

const Home = () => { 
  const [count, setCount] = useState(1);

  function handlePageChange(newCount) {
    setCount(newCount);
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <PageNumberInput count={count} setCount={setCount} onPageChange={handlePageChange} />
      <Thumbnails count={count} />
    </div>
  );
};

export default Home;