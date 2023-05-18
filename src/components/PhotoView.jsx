import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageLoader from './ImageLoader';

function PhotoView({ name }) {
  const [width, setWidth] = useState(Math.min(600, window.innerWidth));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWidth(Math.min(600, window.innerWidth));
    };

    window.addEventListener('resize', handleResize);    

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function closePhotoView() {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("photo");
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }

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

  return (
    <div className="overlay">
      <button className="close-button" onClick={closePhotoView}>
        X
      </button>

      <div
        className="photo-container"
        style={{
          width: `${width}px`
        }}
      >
        <ImageLoader imageUrl={"https://via.placeholder.com/600/" + name} size={width} alt={name} />
      </div>
    </div>
  );
};

export default PhotoView;