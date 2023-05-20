import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImgClick = e => {
    this.toggleModal();
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.el;
    const {showModal} = this.state;
    return (
      <>
        <GalleryItem>
          <GalleryItemImg
            src={webformatURL}
            alt={tags}
            onClick={this.handleImgClick}
          />
        </GalleryItem>
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            src={largeImageURL}
            alt={tags}
          ></Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  el: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
