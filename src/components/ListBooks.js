import React from 'react';
import { Link } from 'react-router-dom';
import If from './If';
import Bookshelf from './Bookshelf';

const ListBooks = ({ books, onShelfChange }) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>

    <If test={books && books.length > 0}>
      <div className="list-books-content">
        <Bookshelf
          title="Currently Reading"
          books={books.filter(b => b.shelf === 'currentlyReading')}
          onShelfChange={onShelfChange}
        />
        <Bookshelf
          title="Want to Read"
          books={books.filter(b => b.shelf === 'wantToRead')}
          onShelfChange={onShelfChange}
        />
        <Bookshelf
          title="Read"
          books={books.filter(b => b.shelf === 'read')}
          onShelfChange={onShelfChange}
        />
      </div>
    </If>

    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

export default ListBooks;
