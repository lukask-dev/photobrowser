import React, { useState, useEffect } from 'react';
import ImageLoader from './ImageLoader';
import { useLocation } from 'react-router-dom';

function ThumbnailGrid({ page, itemsPerPage, gridWith, itemMargin }) {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const url = 'http://jsonplaceholder.typicode.com/photos?_page=' + page + '&_limit=' + itemsPerPage;
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        alert('Error: ' + error.message);
      });
  }, [page, itemsPerPage]);

  function getPhotoNameFromUrl(url) {
    var segments = url.split("/");
    return segments[segments.length - 1];
  }

  function getPhotoLink(photoUrl) {
    const photoName = getPhotoNameFromUrl(photoUrl);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("photo", photoName);
    return location.pathname + "?" + searchParams.toString();
  }

  return (
    <div className="thumbnail-grid-container" >
      <div
        className="thumbnail-grid"
        style={{
          width: `${gridWith}px`
        }}
      >
        {data.map(item => (
          <div
          className="thumbnail-item"
          key={item.id}
          style={{
            marginLeft: `${itemMargin}px`,
            marginRight: `${itemMargin}px`
          }}
          >
            <a href={getPhotoLink(item.url)}>
              <div className="thumbnail-image">
                <ImageLoader imageUrl={item.thumbnailUrl} size="150" alt={item.title} borderRadius="10" />
              </div>
              <p>{item.title}</p>
            </a>
          </div>
        ))}
      </div>
    </div >
  );
}

export default ThumbnailGrid;