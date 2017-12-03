import React from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import Book from './Book';

const Search = ({ onShelfChange, handleSearch, searchResults }) => (
  <div className="search-books">
    <div className="search-books-bar">
      <Link to="/" className="close-search">
        Close
      </Link>
      <div className="search-books-input-wrapper">
        <DebounceInput
          debounceTimeout={500}
          onChange={event => handleSearch(event.target.value.trim())}
          placeholder="Search by title or author"
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
        {searchResults.map(book => (
          <Book key={book.id} book={book} onShelfChange={onShelfChange} />
        ))}
      </ol>
    </div>
  </div>
);

export default Search;
