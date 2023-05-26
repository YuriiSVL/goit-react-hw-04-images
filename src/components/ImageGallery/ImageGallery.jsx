import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from 'components/ImageGallery/ImageGallery.module.css';
import { RotatingLines } from 'react-loader-spinner';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import { fetchImages } from 'servises/images-api';

const ImageGallery = ({ onSelect, searchQuery }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [currenQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const handleSubmit = () => {
      setImages([]);
      setPage(1);
      setCurrentQuery(searchQuery);
      setStatus('pending');
    };
    handleSubmit();
  }, [searchQuery]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (currenQuery === '') {
      return;
    }
    const onSearch = async () => {
      try {
        const loadedImages = await fetchImages(currenQuery, page);
        setImages(prevImages => [...prevImages, ...loadedImages]);
        setStatus('resolved');

        if (loadedImages.length === 0) {
          if (page === 1) {
            toast(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          } else {
            toast('Sorry, it is the end of collection.');
          }

          setStatus('idle');
        }
      } catch (error) {
        console.log(error);
        toast(error.message);
        setStatus('error');
      }
    };

    onSearch();
  }, [page, currenQuery]);

  if (status === 'idle') {
    return (
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            url={image.webformatURL}
            tags={image.tags}
            onSelect={onSelect}
            largeUrl={image.largeImageURL}
          />
        ))}
      </ul>
    );
  }

  if (status === 'pending') {
    return (
      <>
        <ul className={css.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              url={image.webformatURL}
              tags={image.tags}
              onSelect={onSelect}
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

  if (status === 'error') {
    return (
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            url={image.webformatURL}
            tags={image.tags}
            onSelect={onSelect}
            largeUrl={image.largeImageURL}
          />
        ))}
      </ul>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={css.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              url={image.webformatURL}
              tags={image.tags}
              onSelect={onSelect}
              largeUrl={image.largeImageURL}
            />
          ))}
        </ul>
        <Button onLoadMore={loadMore} />
      </>
    );
  }
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
  onSelect: PropTypes.func,
};

export default ImageGallery;
