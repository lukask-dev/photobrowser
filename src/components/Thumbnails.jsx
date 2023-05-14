import React, { useState, useEffect } from 'react';

function Thumbnails() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/photos?_page=0&_limit=10')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

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