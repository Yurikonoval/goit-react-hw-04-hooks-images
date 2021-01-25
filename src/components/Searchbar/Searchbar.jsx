import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import './Searchbar.css';

export default function Seachbar({ onSubmit }) {
  const [findValue, setFindValue] = useState('');

  const handleInputChange = event => {
    setFindValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (findValue.trim() === '') {
      toast.error('Type something to find');
      return;
    }

    onSubmit(findValue);
    setFindValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={findValue}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Seachbar.propTypes = {
  onSubmit: PropTypes.func,
};
