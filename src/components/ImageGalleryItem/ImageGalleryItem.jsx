import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export default function ImageGalleryItem({
  id,
  tags,
  webformatURL,
  largeImageURL,
  onClick,
}) {
  const handleImageClick = () => {
    onClick(largeImageURL, tags);
  };

  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={handleImageClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
