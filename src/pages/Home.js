import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThumbnailGrid from '../components/ThumbnailGrid';
import PageSelector from '../components/PageSelector';
import Photo from '../components/Photo';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const itemsPerPage = 32;
  const lastPage = Math.ceil(5000 / itemsPerPage);

  let page = null;
  let photo = null;

  handlePageParam();
  handlePhotoParam();

  function handlePageParam() {
    const pageParam = searchParams.get('page');
    if (Number.isInteger(Number(pageParam))) {
      page = clamp(pageParam, 1, lastPage);
    }
    else {
      page = 1;
    }
  }

  function handlePhotoParam() {
    const photoParam = searchParams.get('photo');
    const isValidPhoto = typeof photoParam === 'string' && photoParam.length > 0;
    if (isValidPhoto) photo = photoParam;
    else photo = null;
  }

  // not used any more: fixed number of items per page so that users can share links to pages with each other
  // function calculateItemsPerPage() {
  //   const windowWidth = window.innerWidth;
  //   const divWidth = 190;
  //   const rows = 2;
  //   return Math.floor(windowWidth / divWidth) * rows;
  // }

  function updatePageNumber(newPage) {
    newPage = clamp(newPage, 1, lastPage);
    setParamInNavigation("page", newPage);
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function setParamInNavigation(paramName, paramValue) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(paramName, paramValue);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }

  function deleteParamInNavigation(paramName) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(paramName);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }

  useEffect(() => {
    const handeKeyboardInput = (event) => {
      if (event.key === 'Escape') {
        deleteParamInNavigation("photo");
      }
    };

    document.addEventListener('keydown', handeKeyboardInput);
    return () => {
      document.removeEventListener('keydown', handeKeyboardInput);
    };
  },);

  return (
    <div>
      <div className='logo-container'>
        <a href="/">
          <h1>Photo Browser 2023</h1>
        </a>
      </div>
      <PageSelector page={page} updatePageNumber={updatePageNumber} lastPage={lastPage} />
      <ThumbnailGrid page={page} itemsPerPage={itemsPerPage} />
      <PageSelector page={page} updatePageNumber={updatePageNumber} lastPage={lastPage} />
      {(photo !== null) && <Photo name={photo} />}
    </div>
  );
};

export default Home;