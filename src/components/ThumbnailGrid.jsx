import React, { useState, useEffect } from 'react';
import ImageLoader from './ImageLoader';

function ThumbnailGrid({ count, itemsPerPage }) {
  const [data, setData] = useState([]);  

  useEffect(() => {
    const url = 'http://jsonplaceholder.typicode.com/photos?_page=' + count + '&_limit=' + itemsPerPage;
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error("[Fetch Error]:", err));
  }, [count, itemsPerPage]);

  function getPhotoNameFromUrl(url) {
    var segments = url.split("/");
    return segments[segments.length - 1];
  }

  return (
    <div className="thumbnail-grid">
      {data.map(item => (
        <div className="thumbnail-item" key={item.id}>
          <a href={"photo/" + getPhotoNameFromUrl(item.url)}>
            <div className="thumbnail-image">
            <ImageLoader imageUrl={item.thumbnailUrl} size="150" alt={item.title} borderRadius="10" />
            </div>
            <p>{item.title}</p>
          </a>
        </div>
      ))}
    </div>
  );
}

export default ThumbnailGrid;