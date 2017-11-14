import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Bookshelf from './Bookshelf';
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

  update = values => {
    if (values) {
      this.setState({
        currentlyReading: values.currentlyReading,
        wantToRead: values.wantToRead,
        read: values.read
      });
    }
  };

  // render() {
  //   return (
  //     this.state.loading ? <h1>Loading...</h1> : <h2>loaded</h2>
  //   );

  // }

  renderLoading() {}

  render() {
    const { books, currentlyReading, wantToRead, read, loading } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        {loading && (
          <center>
            <ReactLoading type="bubbles" color="#444" />
          </center>
        )}

        {!loading && (
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
        )}
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
