import React, { useState, useEffect } from 'react';

function ImageLoader({ imageUrl, size, alt, borderRadius }) { // size is used for both width and height
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
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
        src={imageUrl}
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