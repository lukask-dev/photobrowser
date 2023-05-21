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
  const [copySuccess, setCopySuccess] = useState(false);

  // open and close component
  useEffect(() => {
    const handleResize = () => {
      setWidth(Math.min(600, window.innerWidth));
    };
    const handeKeyboardInput = (event) => {
      if (event.key === 'Escape') {
        closePhotoView();
      }
    };
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handeKeyboardInput);

    
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';

    return () => {
      document.removeEventListener('keydown', handeKeyboardInput);
      window.removeEventListener('resize', handleResize);
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      
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

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 1200);
      })
      .catch((error) => {
        alert('Failed to copy URL to clipboard:', error);
      });
  };


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
          <div class="photoview-bottomrow">
            <h6 class="photoview-bottomrow-text"><TextLoader text={photoText} length={55} /></h6>
            <button className="button button-copylink" onClick={handleCopyLink} title='Copy the link to this photo to the clipboard'>
              {copySuccess ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoView;