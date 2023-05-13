import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
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
        <ul className="gallery">
          {this.state.images &&
            this.state.images.map(image => (
              <ImageGalleryItem
                key={image.id}
                url={image.webformatURL}
                tags={image.tags}
              />
            ))}
        </ul>
        {this.state.loading && <div>Loading...</div>}
        {this.state.images.length > 0 && <Button fech={this.fechImages} />}
      </>
    );
  }
}
