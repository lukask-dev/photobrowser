import React, { useState } from 'react';
import ThumbnailGrid from '../components/ThumbnailGrid';
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
    const divWidth = 190;
    const rows = 2;
    return Math.floor(windowWidth / divWidth) * rows;
  }

  return (
    <div>
      <div className='logo-container'>
        <h1>Photo Browser 2023</h1>
      </div>
      <PageSelector count={count} setCount={setCount} onPageChange={handlePageChange} lastPage={lastPage} />
      <ThumbnailGrid count={count} itemsPerPage={itemsPerPage} />
      <PageSelector count={count} setCount={setCount} onPageChange={handlePageChange} lastPage={lastPage} />
    </div>
  );
};

export default Home;