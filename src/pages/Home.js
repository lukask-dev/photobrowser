import React, { useState } from 'react';
import ThumbnailList from '../components/ThumbnailList';
import PageSelector from '../components/PageSelector';

const Home = () => { 
  const [count, setCount] = useState(1);

  function handlePageChange(newCount) {
    setCount(newCount);
  }

  return (
    <div>
      <h1>Photo Browser 2023</h1>
      <PageSelector count={count} setCount={setCount} onPageChange={handlePageChange} />
      <ThumbnailList count={count} />
      <PageSelector count={count} setCount={setCount} onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;