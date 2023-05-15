import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from 'components/ImageGallery/ImageGallery.module.css';
import { RotatingLines } from 'react-loader-spinner';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import { fetchImages } from 'servises/images-api';

export default class ImageGallery extends React.Component {
  static propTypes = {
    searchQuery: PropTypes.string,
    onSelect: PropTypes.func,
  };

  state = {
    images: [],
    page: 1,
    status: 'idle',
  };

  // onLoadMore = async () => {
  //   this.setState({ status: 'pending' });
  //   try {
  //     const images = await fetchImages(this.props.searchQuery, this.state.page);
  //     this.setState(prevState => ({
  //       images: [...prevState.images, ...images],
  //       page: this.state.page + 1,
  //     }));

  //     this.setState({ status: 'resolved' });
  //     if (images.length === 0) {
  //       toast('Sorry, there is the end of collection');
  //       this.setState({ status: 'idle' });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast(error.message);
  //     this.setState({ status: 'error' });
  //   }
  // };

  onSearch = async () => {
    this.setState({ status: 'pending' });
    try {
      const images = await fetchImages(this.props.searchQuery, this.state.page);
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        page: this.state.page + 1,
      }));

      this.setState({ status: 'resolved' });
      if (images.length === 0) {
        if (this.state.images.length > 0) {
          toast('Sorry, there is the end of collection');
        } else
          toast(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        this.setState({ status: 'idle' });
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
      this.setState({ status: 'error' });
    }
  };

  // fetchImages = () => {
  //   this.setState({ loading: true });
  //   fetch(
  //     `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${this.state.page}&key=34827531-46fe6f83c6cd16e6040b33d37&image_type=photo&orientation=horizontal&per_page=12`
  //   )
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       return Promise.reject(new Error('404'));
  //     })
  //     .then(data => {
  // if (data.hits.length === 0) {
  //   alert(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  //         return;
  //       }
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...data.hits],
  //         page: this.state.page + 1,
  //       }));
  //     })
  //     .catch(error => this.setState({ error }))
  //     .finally(() => this.setState({ loading: false }));
  // };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState({ status: 'pending' });
      this.setState({ images: [] });
      this.onSearch();
    }
  }

  render() {
    if (this.state.status === 'idle') {
      return (
        <ul className={css.ImageGallery}>
          {this.state.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              url={image.webformatURL}
              tags={image.tags}
              onSelect={this.props.onSelect}
              largeUrl={image.largeImageURL}
            />
          ))}
        </ul>
      );
    }

    if (this.state.status === 'pending') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {this.state.images.map(image => (
              <ImageGalleryItem
                key={image.id}
                url={image.webformatURL}
                tags={image.tags}
                onSelect={this.props.onSelect}
                largeUrl={image.largeImageURL}
              />
            ))}
          </ul>
          <Loader>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
            />
          </Loader>
        </>
      );
    }

    if (this.state.status === 'error') {
      return (
        <ul className={css.ImageGallery}>
          {this.state.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              url={image.webformatURL}
              tags={image.tags}
              onSelect={this.props.onSelect}
              largeUrl={image.largeImageURL}
            />
          ))}
        </ul>
      );
    }

    if (this.state.status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {this.state.images.map(image => (
              <ImageGalleryItem
                key={image.id}
                url={image.webformatURL}
                tags={image.tags}
                onSelect={this.props.onSelect}
                largeUrl={image.largeImageURL}
              />
            ))}
          </ul>
          <Button onLoadMore={this.onSearch} />
        </>
      );
    }
  }

  /* <>
  <ul className={css.ImageGallery}>
    {this.state.images &&
      this.state.images.map(image => (
        <ImageGalleryItem
          key={image.id}
          url={image.webformatURL}
          tags={image.tags}
          onSelect={this.props.onSelect}
          largeUrl={image.largeImageURL}
        />
      ))}
  </ul>
  {this.state.loading ? (
    <Loader>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        visible={true}
      />
    </Loader>
  ) : (
    this.state.images.length > 0 && <Button onFech={this.fetchImages} />
  )}
</>; */
}
