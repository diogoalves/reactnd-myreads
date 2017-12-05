import React from 'react';

const Cover = ({ imageLinks = { smallThumbnail: '' } }) => (
  <div
    className="book-cover"
    style={{
      width: 128,
      height: 193,
      backgroundImage: `url("${imageLinks.smallThumbnail}")`
    }}
  />
);

export default Cover;
