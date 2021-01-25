import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import imagesAPI from './services/image-api';
import Modal from './components/Modal/Modal';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  const [findValue, setFindValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setStatus('pending');
    getImages();
    // eslint-disable-next-line
  }, [findValue]);

  useEffect(() => {
    if (pageNumber !== 1) {
      getImages();
    }
    // eslint-disable-next-line
  }, [pageNumber]);

  const handleFormSubmit = findValue => {
    setFindValue(findValue);
    setPageNumber(1);
    setImages([]);
  };

  const getImages = () => {
    imagesAPI
      .fetchImages(findValue, pageNumber)
      .then(res => {
        if (pageNumber === 1) {
          setImages(res);
        } else {
          setImages(prevImages => [...prevImages, ...res]);
        }
        setStatus('resolved');
        if (pageNumber !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const onLoadMore = () => {
    setPageNumber(pageNumber => pageNumber + 1);
  };

  const onOpenModal = (url, alt) => {
    setLargeImageURL(url);
    setImageAlt(alt);

    modalToggle();
  };

  const modalToggle = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        status={status}
        error={error}
        images={images}
        onClick={onOpenModal}
        onLoadMore={onLoadMore}
      />
      {showModal && (
        <Modal src={largeImageURL} alt={imageAlt} onCloseModal={modalToggle} />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
