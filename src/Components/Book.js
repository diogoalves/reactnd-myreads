import React from 'react';
import ShelfChanger from './ShelfChanger';

const Book = ({ book, onChange }) => (
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
        <ShelfChanger book={book} onChange={onChange} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  </li>
);

export default Book;
