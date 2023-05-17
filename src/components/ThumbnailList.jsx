import React, { useState, useEffect } from 'react';
import ImageLoader from './ImageLoader';

function ThumbnailItems({ count }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = 'http://jsonplaceholder.typicode.com/photos?_page=' + count + '&_limit=10';
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error("[Fetch Error]:", err));
  }, [count]);

  function getPhotoNameFromUrl(url) {
    var segments = url.split("/");
    return segments[segments.length - 1];
  }

  return (
    <div class="thumbnail-list">
      {data.map(item => (
        <div class = "thumbnail" key={item.id}>          
          <a href = {"photo/" + getPhotoNameFromUrl(item.url)}>          
          <ImageLoader imageUrl={item.thumbnailUrl} size="150" alt={item.title} />
          <p>{item.title}</p>
          </a>
        </div>
      ))}
    </div>
  );
}

export default ThumbnailItems;