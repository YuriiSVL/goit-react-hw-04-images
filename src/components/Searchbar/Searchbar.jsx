import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import css from 'components/Searchbar/Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const onChangeHandler = e => {
    setSearchValue(e.currentTarget.value.toLowerCase());
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    if (searchValue.trim() === '') {
      toast('Search query should non be empty!');
      return;
    }

    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmitHandler}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          name="query"
          onChange={onChangeHandler}
          value={searchValue}
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;

// export default class Searchbar extends React.Component {
//   static propTypes = {
//     onSubmit: PropTypes.func,
//   };

//   state = { searchValue: '' };

//   onChangeHandler = e => {
//     this.setState({ searchValue: e.currentTarget.value.toLowerCase() });
//   };

//   onSubmitHandler = e => {
//     e.preventDefault();

//     if (this.state.searchValue.trim() === '') {
//       toast('Search query should non be empty!');
//       return;
//     }

//     this.props.onSubmit(this.state.searchValue);
//     this.setState({ searchValue: '' });
//   };

//   render() {
//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.onSubmitHandler}>
//           <button type="submit" className={css['SearchForm-button']}>
//             <span className={css['SearchForm-button-label']}>Search</span>
//           </button>

//           <input
//             onChange={this.onChangeHandler}
//             value={this.state.searchValue}
//             className={css['SearchForm-input']}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
