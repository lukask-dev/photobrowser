import React, { useState } from 'react';
import ThumbnailList from '../components/ThumbnailList';
import PageSelector from '../components/PageSelector';

const Home = () => {
  const [count, setCount] = useState(1);
  const itemsPerPage = calculateItemsPerPage();
  const lastPage = Math.ceil(5000 / itemsPerPage);

  function handlePageChange(newCount) {
    setCount(newCount);
  }

  function calculateItemsPerPage() {
    const windowWidth = window.innerWidth;
    const divWidth = 200;
    const rows = 2;
    return Math.floor(windowWidth / divWidth) * rows;
  }

  return (
    <div>
      <h1>Photo Browser 2023</h1>
      <PageSelector count={count} setCount={setCount} onPageChange={handlePageChange} lastPage={lastPage} />
        <ThumbnailList count={count} itemsPerPage={itemsPerPage} />
      <PageSelector count={count} setCount={setCount} onPageChange={handlePageChange} lastPage={lastPage} />
    </div>
  );
};

export default Home;