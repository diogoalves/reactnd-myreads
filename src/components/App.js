import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from '../utils/BooksAPI';
import ListBooks from './ListBooks';
import Search from './Search';
import Loading from './Loading';
import { updateBook, updateOrAddBook } from '../utils/updateBook';

class App extends Component {
  state = {
    loading: true,
    books: [],
    searchResults: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books,
        loading: false
      });
    });
  }

  updateShelf = (book, newShelfValue, undo) => {
    let rollbackState = {};
    this.setState(prevState => {
      const { books, searchResults } = prevState;
      rollbackState = { ...prevState };
      return {
        loading: true,
        books: updateOrAddBook(books, book, newShelfValue),
        searchResults: updateBook(searchResults, book, newShelfValue)
      };
    });

    BooksAPI.update(book, newShelfValue)
      .then(res => {
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState(rollbackState);
        undo();
      });
  };

  handleSearch = query => {
    this.setState({ loading: true });

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
        this.setState({ searchResults, loading: false });
      } else {
        this.setState({ searchResults: [], loading: false });
      }
    });
  };

  render() {
    const { loading, books, searchResults } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              loading={loading}
              books={books}
              onShelfChange={this.updateShelf}
            />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <Search
              searchResults={searchResults}
              handleSearch={this.handleSearch}
              onShelfChange={this.updateShelf}
            />
          )}
        />

        <Loading show={loading} />
      </div>
    );
  }
}

export default App;
