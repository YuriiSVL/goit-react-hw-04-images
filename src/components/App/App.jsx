import React from 'react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import css from 'components/App/App.module.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const formSubmitHandler = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const selecteImage = link => {
    setSelectedImage(link);
    setShowModal(true);
  };

  return (
    <div className={css.App}>
      {showModal && <Modal onClose={toggleModal} url={selectedImage} />}
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery searchQuery={searchQuery} onSelect={selecteImage} />
      <ToastContainer autoClose={3000} />
    </div>
  );
};
