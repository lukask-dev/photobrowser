import React, { useState, useEffect } from 'react';

function ImageLoader({ imageUrl, size, alt, borderRadius }) { // size is used for both width and height
  const [isLoading, setIsLoading] = useState(true);
  const [cacheBuster, setCacheBuster] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setCacheBuster(Date.now());
  }, [imageUrl]);

  function handleImageLoad() {
    setIsLoading(false);
  }

  function generateRandomGrey() {
    const shade = (Math.floor(Math.random() * 4) + 4).toString(16);
    const hexColor = `#${shade}${shade}${shade}`;
    return hexColor;
  }

  return (
    <div
      className="placeholder"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${borderRadius}px`,
        backgroundColor: generateRandomGrey()
      }}
    >
      <img
        // cacheBuster makes sure the image always loads, without this there are caching issues on chrome.
        // I'm not happy with this solution, but decided it's better than having some images not load.
        src={`${imageUrl}?${cacheBuster}`} 
        alt={alt}
        onLoad={handleImageLoad}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: `${borderRadius}px`,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in',
        }}
      />
    </div>
  )
}

export default ImageLoader;