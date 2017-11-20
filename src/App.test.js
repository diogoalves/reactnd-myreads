import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders without crashing', () => {
  fetch.mockResponse(
    JSON.stringify({
      books: [
        {
          title: 'Book 1',
          authors: ['Author 1.'],
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
          },
          id: 'nggnmAEACAAJ',
          shelf: 'currentlyReading'
        }
      ]
    })
  );

  const div = document.createElement('div');
  const renderized = ReactDOM.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
    div
  );
});
