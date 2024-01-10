import React, { useState } from 'react';
import './ImageGallery.css';

const images = [
  'https://source.unsplash.com/random/?hospital',
  'https://source.unsplash.com/random/?doctor',
  'https://source.unsplash.com/random/?medical',
  'https://source.unsplash.com/random/?clinic',
  'https://source.unsplash.com/random/?healthcare'
];

function ImageGallery() {
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const handleClick = (src) => {
    setFullscreenImage(src);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="gallery">
      {images.map((src, index) => (
        <img 
          key={index} 
          src={src} 
          alt={`Gallery item ${index + 1}`} 
          className="gallery-image" 
          onClick={() => handleClick(src)}
        />
      ))}
      {fullscreenImage && (
        <div className="fullscreen" onClick={closeFullscreen}>
          <img src={fullscreenImage} alt="Fullscreen" />
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
