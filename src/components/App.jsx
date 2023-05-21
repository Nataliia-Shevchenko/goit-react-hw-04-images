import React, { useState, useEffect } from 'react';
import { fetchPictures } from '../services/pixabay-api';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (searchText === '') {
      return;
    }
    async function fetch() {
      try {
        setLoading(true);
        const { hits, totalHits } = await fetchPictures(searchText, page);
        if (hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        const filtredHits = hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );
        if (page === 1) {
          setImages(filtredHits);
          setTotalPages(Math.ceil(totalHits / 12));
        }
        if (page > 1) {
          setImages(prev => [...prev, ...filtredHits]);
          setError('');
        }
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, [page, searchText]);

  const onSubmit = searchText => {
    setSearchText(searchText);
    setPage(1);
    setImages(null);
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {error && toast.error(error)}
      {loading && <Loader />}
      {images?.length > 0 && <ImageGallery images={images} />}
      {images?.length >= 12 && page !== totalPages && (
        <Button onClick={handleLoadMoreClick} />
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default App;
