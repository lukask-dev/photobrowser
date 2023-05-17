import React from 'react';
import { useParams } from 'react-router-dom';
import ImageLoader from '../components/ImageLoader';

const Photo = () => {
  const { name } = useParams();

  return (
    <div>
      <h1>Photo Page</h1>
      <ImageLoader imageUrl={"https://via.placeholder.com/600/" + name} size="600" alt="" />
    </div>
  );
};

export default Photo;