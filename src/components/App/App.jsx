import React from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import css from 'components/App/App.module.css';

export class App extends React.Component {
  state = {
    searchQuery: '',
    showModal: false,
    selectedImage: null,
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  formSubmitHandler = searchQuery => {
    this.setState({ searchQuery });
  };

  selecteImage = link => {
    this.setState({
      selectedImage: link,
      showModal: true,
    });
  };

  render() {
    return (
      <div className={css.App}>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} url={this.state.selectedImage} />
        )}
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery
          searchQuery={this.state.searchQuery}
          onSelect={this.selecteImage}
        />
      </div>
    );
  }
}
