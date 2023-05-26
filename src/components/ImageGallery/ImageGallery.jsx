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

  // const getPage = () => {
  //   setPage(prevPage => prevPage + 1);
  // };

  // const onLoadMore = async () => {
  //   setStatus('pending');

  //   try {
  //     const images = await fetchImages(searchQuery, page + 1);
  //     setImages(prevState => [...prevState], ...images);
  //     // setPage(prevState => prevState + 1);
  //     setStatus('resolved');

  //     if (images.length === 0) {
  //       toast('Sorry, it is the end of collection');
  //       setStatus('idle');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast(error.message);
  //     setStatus('error');
  //   }
  // };

  useEffect(() => {
    if (searchQuery === '') {
      console.log('empty query');
      return;
    }
    const handleSubmit = () => {
      setImages([]);
      setPage(1);
      setCurrentQuery(searchQuery);
      setStatus('pending');
      console.log('render');
    };
    handleSubmit();
    console.log('handleSubmit');
  }, [searchQuery]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (currenQuery === '') {
      console.log('empty query');
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
    console.log('on search render');
  }, [page, currenQuery]);

  // const onLoadMore = async () => {
  //   setStatus('pending');

  //   try {
  //     const images = await fetchImages(searchQuery, page);
  //     setImages(prevImages => [...prevImages, ...images]);
  //     // setPage(prevState => prevState + 1);
  //     setStatus('resolved');

  //     if (images.length === 0) {
  //       toast('Sorry, it is the end of collection');
  //       setStatus('idle');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast(error.message);
  //     setStatus('error');
  //   }
  // };

  // useEffect(() => {
  //   if (page === 1) {
  //     return;
  //   }

  //   onLoadMore();
  //   console.log('render');
  // }, [page]);

  // const onSearch = async () => {
  //   setStatus('pending');
  //   setPage(1);

  //   try {
  //     const images = await fetchImages(searchQuery);
  //     setImages([...images]);
  //     setStatus('resolved');

  //     if (images.length === 0) {
  //       toast(
  //         'Sorry, there are no images matching your search query. Please try again.'
  //       );
  //       setStatus('idle');
  //       setPage(1);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast(error.message);
  //     setStatus('error');
  //   }
  // };

  // useEffect(() => {
  //   if (searchQuery === '') {
  //     console.log('empty query');
  //     return;
  //   }

  // const onSearch = async () => {
  //   setStatus('pending');
  //   setPage(1);

  //   try {
  //     const images = await fetchImages(searchQuery);
  //     // setImages([...images]);
  //     setImages(prevImages => [...prevImages, ...images]);
  //     setStatus('resolved');

  //     if (images.length === 0) {
  //       toast(
  //         'Sorry, there are no images matching your search query. Please try again.'
  //       );
  //       setStatus('idle');
  //       setPage(1);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast(error.message);
  //     setStatus('error');
  //   }
  // };

  //   setImages([]);
  //   setPage(1);
  //   onSearch();
  //   setStatus('pending');
  //   console.log('render');
  // }, [searchQuery]);

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

// export default class ImageGallery extends React.Component {
//   static propTypes = {
//     searchQuery: PropTypes.string,
//     onSelect: PropTypes.func,
//   };

//   state = {
//     images: [],
//     page: 1,
//     status: 'idle',
//   };

//   onLoadMore = async () => {
//     this.setState({
//       status: 'pending',
//     });

//     try {
//       const images = await fetchImages(
//         this.props.searchQuery,
//         this.state.page + 1
//       );
//       this.setState(prevState => ({
//         images: [...prevState.images, ...images],
//         page: prevState.page + 1,
//       }));

//       this.setState({ status: 'resolved' });
//       if (images.length === 0) {
//         toast('Sorry, it is the end of collection');
//         this.setState({ status: 'idle' });
//       }
//     } catch (error) {
//       console.log(error);
//       toast(error.message);
//       this.setState({ status: 'error' });
//     }
//   };

//   onSearch = async () => {
//     this.setState({
//       status: 'pending',
//       page: 1,
//     });
//     try {
//       const images = await fetchImages(this.props.searchQuery);
//       this.setState({
//         images: [...images],
//       });

//       this.setState({ status: 'resolved' });
//       if (images.length === 0) {
//         toast(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         this.setState({
//           status: 'idle',
//           page: 1,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       toast(error.message);
//       this.setState({ status: 'error' });
//     }
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.searchQuery !== prevProps.searchQuery) {
//       this.setState({
//         status: 'pending',
//         images: [],
//         page: 1,
//       });
//       this.onSearch();
//     }
//   }

//   render() {
//     if (this.state.status === 'idle') {
//       return (
//         <ul className={css.ImageGallery}>
//           {this.state.images.map(image => (
//             <ImageGalleryItem
//               key={image.id}
//               url={image.webformatURL}
//               tags={image.tags}
//               onSelect={this.props.onSelect}
//               largeUrl={image.largeImageURL}
//             />
//           ))}
//         </ul>
//       );
//     }

//     if (this.state.status === 'pending') {
//       return (
//         <>
//           <ul className={css.ImageGallery}>
//             {this.state.images.map(image => (
//               <ImageGalleryItem
//                 key={image.id}
//                 url={image.webformatURL}
//                 tags={image.tags}
//                 onSelect={this.props.onSelect}
//                 largeUrl={image.largeImageURL}
//               />
//             ))}
//           </ul>
//           <Loader>
//             <RotatingLines
//               strokeColor="grey"
//               strokeWidth="5"
//               animationDuration="0.75"
//               width="50"
//               visible={true}
//             />
//           </Loader>
//         </>
//       );
//     }

//     if (this.state.status === 'error') {
//       return (
//         <ul className={css.ImageGallery}>
//           {this.state.images.map(image => (
//             <ImageGalleryItem
//               key={image.id}
//               url={image.webformatURL}
//               tags={image.tags}
//               onSelect={this.props.onSelect}
//               largeUrl={image.largeImageURL}
//             />
//           ))}
//         </ul>
//       );
//     }

//     if (this.state.status === 'resolved') {
//       return (
//         <>
//           <ul className={css.ImageGallery}>
//             {this.state.images.map(image => (
//               <ImageGalleryItem
//                 key={image.id}
//                 url={image.webformatURL}
//                 tags={image.tags}
//                 onSelect={this.props.onSelect}
//                 largeUrl={image.largeImageURL}
//               />
//             ))}
//           </ul>
//           <Button onLoadMore={this.onLoadMore} />
//         </>
//       );
//     }
//   }

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
</>;} */
