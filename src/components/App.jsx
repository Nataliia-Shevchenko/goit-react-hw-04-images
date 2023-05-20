import React, { Component } from 'react';
import { fetchPictures } from '../services/pixabay-api';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';

class App extends Component {
  state = {
    searchText: '',
    images: null,
    loading: false,
    error: '',
    page: 1,
    totalPages: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchText, page } = this.state;
    if (prevState.searchText !== searchText) {
      try {
        this.setState({ loading: true });
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

        return this.setState({
          images: filtredHits,
          totalPages: Math.ceil(totalHits / 12),
        });
      } catch (error) {
        this.setState({ error: error.message });
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }

    if (prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const { hits } = await fetchPictures(searchText, page);
        const filtredHits = hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );
        return this.setState(prevState => ({
          images: [...prevState.images, ...filtredHits],
          error: '',
        }));
      } catch (error) {
        this.setState({ error: error.message });
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onSubmit = searchText => {
    this.setState({ searchText, page: 1 });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, loading, page, totalPages } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {error && toast.error(error)}
        {loading && <Loader />}
        {images?.length > 0 && <ImageGallery images={images} />}
        {images?.length >= 12 && page !== totalPages && (
          <Button onClick={this.handleLoadMoreClick} />
        )}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

export default App;
