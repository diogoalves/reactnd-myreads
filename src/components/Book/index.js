import React from 'react';
import ShelfChanger from '../ShelfChanger';
import Cover from './Cover';
import Authors from './Authors';

const Book = ({ book, onShelfChange }) => (
  <li>
    <div className="book">
      <div className="book-top">
        <Cover imageLinks={book.imageLinks} />
        <ShelfChanger book={book} onShelfChange={onShelfChange} />
      </div>
      <div className="book-title">{book.title}</div>
      <Authors authors={book.authors} />
    </div>
  </li>
);

export default Book;
