import React from 'react';
import css from 'components/Searchbar/Searchbar.module.css';

export default class Searchbar extends React.Component {
  state = { searchValue: '' };

  onChangeHandler = e => {
    this.setState({ searchValue: e.currentTarget.value.toLowerCase() });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    if (this.state.searchValue.trim() === '') {
      alert('Search query should non be empty!');
      return;
    }

    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmitHandler}>
          <button type="submit" className={css['SearchForm-button']}>
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>

          <input
            onChange={this.onChangeHandler}
            value={this.state.searchValue}
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
