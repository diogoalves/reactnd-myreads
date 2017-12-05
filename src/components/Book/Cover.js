import React from 'react';

const divStyle = imageLinks => ({
  width: 128,
  height: 193,
  backgroundImage: `url("${imageLinks.smallThumbnail}")`
});

const Cover = ({ imageLinks = { smallThumbnail: '' } }) => (
  <div className="book-cover" style={divStyle(imageLinks)} />
);

export default Cover;
