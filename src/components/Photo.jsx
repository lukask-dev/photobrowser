import React from 'react';
import ImageLoader from './ImageLoader';

function Photo({ name }) {

  const width = Math.min(600, window.innerWidth);

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