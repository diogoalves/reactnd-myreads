import React from 'react';
import Book from './Book';

const Bookshelf = ({title, books, subset, onChange}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {subset
          .map( (id) => (
            <Book key={id} book={books.find(b => b.id === id)} onChange={onChange} />
        ))}
      </ol>
    </div>
  </div>    
);

export default Bookshelf;