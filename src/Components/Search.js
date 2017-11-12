import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import escapeRegExp from 'escape-string-regexp';
// import sortBy from 'sort-by';
import Book from './Book';
import * as BooksAPI from '../utils/BooksAPI';

// todo add debounce to search
class Search extends Component {

  state = {
    books: [],
    query: ''
  }

  handleChange = (event) => {
    const query = event.target.value.trim();

    this.setState({
      query
    })

    BooksAPI.search(query).then((books) => {
      if(Array.isArray(books)) {
        this.setState({ books });
      } else {
        this.setState({ books: [] });
      }
    })
  }

  render() {
    const { books, query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" value={query} onChange={this.handleChange} placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map( (book) => (
              <Book key={book.id} data={book} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;