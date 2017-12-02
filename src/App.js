import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './Components/ListBooks';
import Search from './Components/Search';
import './App.css';
import * as BooksAPI from './utils/BooksAPI';

class BooksApp extends Component {
  state = {
    loading: true,
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchResults: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books,
        currentlyReading: this.filterShelf(books, 'currentlyReading'),
        wantToRead: this.filterShelf(books, 'wantToRead'),
        read: this.filterShelf(books, 'read'),
        loading: false
      });
    });
  }

  filterShelf = (books, shelf) => {
    return books.filter(b => b.shelf === shelf).map(b => b.id);
  };

  update = (values, changedBookId, newShelf) => {
    console.log('chegando');

    console.log(values);
    console.log(changedBookId);
    console.log(newShelf);
    if (values) {
      const { books } = this.state;
      const newBooks = books.map(e => {
        if (e.id === changedBookId) {
          e.shelf = newShelf;
        }
        return e;
      });
      this.setState({
        books: newBooks,
        currentlyReading: values.currentlyReading,
        wantToRead: values.wantToRead,
        read: values.read
      });
    }
  };

  handleSearch = query => {
    BooksAPI.search(query).then(receivedBooks => {
      if (Array.isArray(receivedBooks)) {
        const { books } = this.state;
        const searchResults = receivedBooks.map(rB => {
          const found = books.find(b => b.id === rB.id);
          if (found) {
            rB.shelf = found.shelf;
          }
          return rB;
        });
        this.setState({ searchResults });
      } else {
        this.setState({ searchResults: [] });
      }
    });
  };

  render() {
    const {
      loading,
      books,
      currentlyReading,
      wantToRead,
      read,
      searchResults
    } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              loading={loading}
              books={books}
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              update={this.update}
            />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <Search
              searchResults={searchResults}
              handleSearch={this.handleSearch}
              onChange={this.update}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
