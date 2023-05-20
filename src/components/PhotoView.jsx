import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageLoader from './ImageLoader';
import TextLoader from './TextLoader';

function PhotoView({ id, photosUrl, albumsUrl, usersUrl }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [width, setWidth] = useState(Math.min(600, window.innerWidth));
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('Loading...');
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoText, setPhotoText] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setWidth(Math.min(600, window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handeKeyboardInput = (event) => {
      if (event.key === 'Escape') {
        closePhotoView();
      }
    };
    document.addEventListener('keydown', handeKeyboardInput);
    return () => {
      document.removeEventListener('keydown', handeKeyboardInput);
    };
  },);

  function closePhotoView() {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("photo");
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }

  useEffect(() => {
    fetchPhotoData(id);
  },);

  function fetchPhotoData(id) {
    fetch(`${photosUrl}/${id}`)
      .then(response => response.json())
      .then(photoObject => {
        setImageUrl(photoObject.url);
        setAltText(photoObject.title);
        setPhotoTitle(photoObject.title);
        fetchAlbum(photoObject.albumId);
      })
      .catch(error => {
        alert('Error fetching photo data:', error);
      });
  }

  function fetchAlbum(albumId) {
    fetch(`${albumsUrl}/${albumId}`)
      .then(response => response.json())
      .then(albumObject => {
        fetchUser(albumObject.userId);
      })
      .catch(error => {
        alert('Error fetching album data:', error);
      });
  }

  function fetchUser(userId) {
    fetch(`${usersUrl}/${userId}`)
      .then(response => response.json())
      .then(userObject => {
        setPhotoText("By " + userObject.name + " from " + userObject.address.city);
      })
      .catch(error => {
        alert('Error fetching user data:', error);
      });
  }

  return (
    <div className="overlay">
      <button className="close-button" onClick={closePhotoView}>
        X
      </button>

      <div
        className="photoview-container"
        style={{
          width: `${width}px`
        }}
      >
        <ImageLoader imageUrl={imageUrl} size={width} alt={altText} randomizeColor={false} />
        <div className='photoview-textsection'>
          <h2><TextLoader text={photoTitle} length={12} /></h2>
          <h6><TextLoader text={photoText} length={55} /></h6>
        </div>
      </div>
    </div>
  );
};

export default PhotoView;