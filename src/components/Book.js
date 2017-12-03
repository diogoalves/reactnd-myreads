import React from 'react';
import ShelfChanger from './ShelfChanger';

const Book = ({ book, onShelfChange }) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
          }}
        />
        <ShelfChanger book={book} onShelfChange={onShelfChange} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  </li>
);

export default Book;
