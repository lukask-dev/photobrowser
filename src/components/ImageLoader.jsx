import React, { useState, useEffect } from 'react';

function ImageLoader({ imageUrl, size, alt }) { // size is used for both width and height
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [imageUrl]);

  function handleImageLoad() {
    setIsLoading(false);
  }

  function generateRandomGrey() {
    const shade = (Math.floor(Math.random() * 5) + 2).toString(16);
    const hexColor = `#${shade}${shade}${shade}`;
    return hexColor;
  }

  return (
    <div>
      {(isLoading || !imageUrl) &&
      <div
          className="placeholder"
          style={{ width: `${size}px`, height: `${size}px`, backgroundColor: generateRandomGrey() }}
        >         
        </div>
      }
      {imageUrl && (
        <img
          src={imageUrl}
          alt={alt}
          onLoad={handleImageLoad}
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.2s ease-in',
          }}
        />
      )}
    </div>
  );
}

export default ImageLoader;