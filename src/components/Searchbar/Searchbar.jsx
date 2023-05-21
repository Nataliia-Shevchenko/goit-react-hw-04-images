import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoSearch } from 'react-icons/go';
import {
  Header,
  SearchForm,
  SearchBtn,
  SearchBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (search.trim() === '') {
      toast.error('Fill the search form!');
      return;
    }

    onSubmit(search);
    setSearch('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <GoSearch />
          <SearchBtnLabel />
        </SearchBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={search}
        />
      </SearchForm>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
