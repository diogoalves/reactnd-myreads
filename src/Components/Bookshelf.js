import React from 'react';
import Book from './Book';

const Bookshelf = ({title, filter, books}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books
          .filter( (book) => book.shelf === filter )
          .map( (book) => (
            <Book key={book.id} data={book} />
        ))}
      </ol>
    </div>
  </div>    
);

export default Bookshelf;