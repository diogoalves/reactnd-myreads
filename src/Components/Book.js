import React from 'react';
import ShelfChanger from './ShelfChanger';

const Book = ({data}) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${data.imageLinks.smallThumbnail}")` }}></div>
        <ShelfChanger />
      </div>
      <div className="book-title">{data.title}</div>
      <div className="book-authors">{data.authors}</div>
    </div>
  </li>
);

export default Book;