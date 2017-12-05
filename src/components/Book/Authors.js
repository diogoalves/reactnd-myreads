import React from 'react';

const Authors = ({ authors = [] }) => (
  <div className="book-authors">{authors.join(', ')}</div>
);

export default Authors;
