import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import * as BooksAPI from '../utils/BooksAPI';

class ListBooks extends Component {
  state = {
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
        read: this.filterShelf(books, 'read')
      });
    });
  }

  filterShelf = (books, shelf) => {
    return books.filter(b => b.shelf === shelf).map(b => b.id);
  };

  update = values => {
    if (values) {
      this.setState({
        currentlyReading: values.currentlyReading,
        wantToRead: values.wantToRead,
        read: values.read
      });
    }
  };

  render() {
    const { books, currentlyReading, wantToRead, read } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
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
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
