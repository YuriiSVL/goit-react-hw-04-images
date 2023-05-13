import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export class App extends React.Component {
  state = { searchQuery: '' };

  formSubmitHandler = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </>
    );
  }
}
