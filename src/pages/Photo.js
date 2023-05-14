import React from 'react';
import { useParams } from 'react-router-dom';

const Photo = () => {
  const { name } = useParams();

  return (
    <div>
      <h1>Photo Page</h1>

      <img src={"https://via.placeholder.com/600/" + name} alt="Photo" />
    </div>
  );
};

export default Photo;