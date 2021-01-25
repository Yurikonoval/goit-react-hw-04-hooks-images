import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

export default function Modal({ src, alt, onCloseModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);

    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  });

  const handleCloseModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className="Overlay" onClick={handleCloseModal}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onCloseModal: PropTypes.func,
};
