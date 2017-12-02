import React from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import If from './If';
import Bookshelf from './Bookshelf';

const ListBooks = ({
  loading,
  books,
  currentlyReading,
  wantToRead,
  read,
  update
}) => (
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
          onChange={update}
        />
        <Bookshelf
          title="Want to Read"
          books={books}
          subset={wantToRead}
          onChange={update}
        />
        <Bookshelf title="Read" books={books} subset={read} onChange={update} />
      </div>
    </If>

    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

export default ListBooks;
