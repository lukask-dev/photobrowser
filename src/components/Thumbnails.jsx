import React, { useState, useEffect } from 'react';

function Thumbnails({ count }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = 'http://jsonplaceholder.typicode.com/photos?_page=' + count + '&_limit=10';
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data));
  }, [count]);

  const getFileNameFromPath = (path) => {
    const segments = path.split("/");
    return segments[segments.length - 1];
  };

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <a href = {"photo/" + getFileNameFromPath(item.url)}>
          <img src={item.thumbnailUrl} alt={item.title} />
          </a>
        </div>
      ))}
    </div>
  );
}

export default Thumbnails;