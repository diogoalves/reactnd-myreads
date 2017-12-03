import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ReactLoading from 'react-loading';
import './App.css';
import * as BooksAPI from '../utils/BooksAPI';
import ListBooks from './ListBooks';
import Search from './Search';
import If from './If';

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

  updateShelf = (book, value) => {
    const { books, searchResults } = this.state;
    const updatedBookIndex = books.findIndex(b => b.id === book.id);
    if (updatedBookIndex >= 0) {
      books[updatedBookIndex].shelf = book.shelf;
    } else {
      books.push(book);
    }

    const updatedBooks = books.map(b => {
      if (b.id === book.id) {
        b.shelf = value;
      }
      return b;
    });
    const updatedSearchResults = searchResults.map(b => {
      if (b.id === book.id) {
        b.shelf = value;
      }
      return b;
    });

    this.setState({
      books: updatedBooks,
      searchResults: updatedSearchResults,
      loading: true
    });

    BooksAPI.update(book, value).then(res => {
      this.setState({ loading: false });
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

        <div className="loading">
          <If test={loading}>
            <center>
              <ReactLoading type="bubbles" color="#444" delay={0} />
            </center>
          </If>
        </div>
      </div>
    );
  }
}

export default App;
