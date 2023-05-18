import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThumbnailGrid from '../components/ThumbnailGrid';
import PageSelector from '../components/PageSelector';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);  
  const itemsPerPage = calculateItemsPerPage();
  const lastPage = Math.ceil(5000 / itemsPerPage);

  let page = null;

  validatePageParam();
  validatePhotoParam();

  function validatePageParam() {
    const pageParam = searchParams.get('page');
    if (Number.isInteger(Number(pageParam))
      && Number(pageParam) >= 1
      && Number(pageParam) <= lastPage) {
      page = pageParam;
    }
    else {
      page = 1;
      updateParamInNavigation("page", page);
    } 
  }

  function validatePhotoParam() {
    const photoParam = searchParams.get('photo');
  }

  function calculateItemsPerPage() {
    const windowWidth = window.innerWidth;
    const divWidth = 190;
    const rows = 2;
    return Math.floor(windowWidth / divWidth) * rows;
  }

  function updatePageNumber(newPage) {
    newPage = clamp(newPage, 1, lastPage);
    updateParamInNavigation("page", newPage);
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateParamInNavigation(paramName, paramValue) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(paramName, paramValue);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }

  return (
    <div>
      <div className='logo-container'>
        <h1>Photo Browser 2023</h1>
      </div>
      <PageSelector page={page} updatePageNumber={updatePageNumber} lastPage={lastPage} />
      <ThumbnailGrid page={page} itemsPerPage={itemsPerPage} />
      <PageSelector page={page} updatePageNumber={updatePageNumber} lastPage={lastPage} />
    </div>
  );
};

export default Home;