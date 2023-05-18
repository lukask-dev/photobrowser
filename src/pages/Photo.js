import React from 'react';
import ImageLoader from '../components/ImageLoader';

function Photo({ name }) {

  return (
    <div className="overlay">
      <div className="photo-container">
        <ImageLoader imageUrl={"https://via.placeholder.com/600/" + name} size="600" alt="" />
      </div>
    </div>
  );
};

export default Photo;