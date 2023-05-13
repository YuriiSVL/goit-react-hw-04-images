import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from 'components/ImageGallery/ImageGallery.module.css';
import { RotatingLines } from 'react-loader-spinner';
import Button from 'components/Button/Button';

export default class ImageGallery extends React.Component {
  state = {
    images: [],
    page: 1,
    loading: false,
    error: null,
  };

  fechImages = () => {
    this.setState({ loading: true });
    fetch(
      `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${this.state.page}&key=34827531-46fe6f83c6cd16e6040b33d37&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response =>
        response.json().then(data =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            page: this.state.page + 1,
          }))
        )
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState({ loading: true });
      this.setState({ images: [] });
      this.fechImages();
    }
  }

  render() {
    return (
      <>
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
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        ) : (
          this.state.images.length > 0 && <Button fech={this.fechImages} />
        )}
      </>
    );
  }
}
