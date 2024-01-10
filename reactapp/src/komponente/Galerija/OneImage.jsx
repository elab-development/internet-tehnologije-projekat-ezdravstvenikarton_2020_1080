import React from 'react';

function OneImage({ src, alt, onClick }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className="gallery-image" 
      onClick={onClick}
    />
  );
}

export default OneImage;
