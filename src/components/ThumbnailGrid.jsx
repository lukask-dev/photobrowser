import React, { useState, useEffect } from 'react';
import ImageLoader from './ImageLoader';
import { useLocation, Link } from 'react-router-dom';

function ThumbnailGrid({ page, itemsPerPage, photosUrl }) {
  const [data, setData] = useState([]);
  const location = useLocation();

  const divWidth = 190;
  const [gridWidth, setGridWidth] = useState(divWidth * calculateItemsPerRow());

  function calculateItemsPerRow() {
    const maxDivs = Math.floor(window.innerWidth / divWidth);
    let maxDivsforLayout = 2;
    while (maxDivsforLayout * 2 <= maxDivs) {
      maxDivsforLayout *= 2;
    }
    return maxDivsforLayout;
  }

  useEffect(() => {
    const handleResize = () => {
      setGridWidth(divWidth * calculateItemsPerRow());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const url = photosUrl + '?_page=' + page + '&_limit=' + itemsPerPage;
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        alert('Error: ' + error.message);
      });
  }, [page, itemsPerPage, photosUrl]);

  function getPhotoLink(photoId) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("photo", photoId);
    return location.pathname + "?" + searchParams.toString();
  }

  return (
    <div className="thumbnail-grid-container" >
      <div
        className="thumbnail-grid"
        style={{
          width: `${gridWidth}px`
        }}
      >
        {data.map(item => (
          <div
            className="thumbnail-item"
            key={item.id}
          // could use this still to display 2 per row on mobile
          // style={{
          //   marginLeft: `${itemMargin}px`,
          //   marginRight: `${itemMargin}px`
          // }}
          >
            <Link to={getPhotoLink(item.id)}>
              <div className="thumbnail-image">
                <ImageLoader imageUrl={item.thumbnailUrl} size="150" alt={item.title} borderRadius="10" randomizeColor={true} />
              </div>
              <p>{item.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div >
  );
}

export default ThumbnailGrid;