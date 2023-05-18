import React, {useEffect, useState} from 'react';
import ImageLoader from './ImageLoader';

function Photo({ name }) {
  const [width, setWidth] = useState(Math.min(600, window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setWidth(Math.min(600, window.innerWidth));
    };

    window.addEventListener('resize', handleResize);    

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="overlay">
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

export default Photo;