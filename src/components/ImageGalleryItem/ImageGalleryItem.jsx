import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ el: {webformatURL, tags, largeImageURL} }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleImgClick = e => {
    toggleModal();
  };

  return (
    <>
      <GalleryItem>
        <GalleryItemImg
          src={webformatURL}
          alt={tags}
          onClick={handleImgClick}
        />
      </GalleryItem>
      {showModal && (
        <Modal onClose={toggleModal} src={largeImageURL} alt={tags}></Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  el: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
