import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Bookshelf from './Bookshelf';
import If from './If';
import * as BooksAPI from '../utils/BooksAPI';

class ListBooks extends Component {
  state = {
    loading: true,
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
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

  render() {
    const { books, currentlyReading, wantToRead, read, loading } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <If test={loading}>
          <center>
            <ReactLoading type="bubbles" color="#444" />
          </center>
        </If>

        <If test={!loading}>
          <div className="list-books-content">
            <Bookshelf
              title="Currently Reading"
              books={books}
              subset={currentlyReading}
              onChange={this.update}
            />
            <Bookshelf
              title="Want to Read"
              books={books}
              subset={wantToRead}
              onChange={this.update}
            />
            <Bookshelf
              title="Read"
              books={books}
              subset={read}
              onChange={this.update}
            />
          </div>
        </If>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
