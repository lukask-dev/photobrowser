import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ThumbnailGrid from '../components/ThumbnailGrid';
import PageSelector from '../components/PageSelector';
import PhotoView from '../components/PhotoView';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const backendUrl = 'https://jsonplaceholder.typicode.com/photos';

  const itemsPerPage = 32;
  const [photoCount, setPhotoCount] = useState(-1);
  let lastPage = calculateLastPage();

  let page = handlePageParam();

  let photo = handlePhotoParam();  
  if (photoCount === -1) fetchPhotoCount();

  function handlePageParam() {
    if (searchParams.has('page')) {
      const pageParam = searchParams.get('page');
      const number = Number(pageParam);
      if (Number.isInteger(number) && number > 0) {
        return pageParam;
      }
    }
    return 1;
  }

  function handlePhotoParam() {
    const photoParam = searchParams.get('photo');
    const isValidPhoto = typeof photoParam === 'string' && photoParam.length > 0;
    if (isValidPhoto) {
      return photoParam;
    }
    return null;
  }

  function calculateLastPage() {
    if (photoCount === -1) return 1;
    return Math.ceil(photoCount / itemsPerPage);
  }

  function fetchPhotoCount() {
    fetch(backendUrl)
      .then(response => response.json())
      .then(data => {
        setPhotoCount(data.length);
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
  }

  // keyboard shortcuts
  useEffect(() => {
    const handeKeyboardInput = (event) => {
      if (event.key === 'ArrowLeft') {
        setNewPageNumber(page - 1);
      }
      else if (event.key === 'ArrowRight') {
        setNewPageNumber(page + 1);
      }
    };
    document.addEventListener('keydown', handeKeyboardInput);
    return () => {
      document.removeEventListener('keydown', handeKeyboardInput);
    };
  },);

  function setNewPageNumber(newPage) {
    newPage = clamp(newPage, 1, lastPage);
    setParamInNavigation("page", newPage);
    page = newPage;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function setParamInNavigation(paramName, paramValue) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(paramName, paramValue);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }

  return (
    <div>
      <div className='logo-container'>
        <Link to="/photobrowser">
          <h1>Photo Browser 2023</h1>
        </Link>
      </div>
      <main>
        <PageSelector page={page} setNewPageNumber={setNewPageNumber} lastPage={lastPage} />
        <ThumbnailGrid page={page} itemsPerPage={itemsPerPage} backendUrl={backendUrl} />
        <PageSelector page={page} setNewPageNumber={setNewPageNumber} lastPage={lastPage} />
        {(photo !== null) && <PhotoView name={photo} />}
      </main>
      <div className='footer-space' ></div>
    </div>
  );
};

export default Home;