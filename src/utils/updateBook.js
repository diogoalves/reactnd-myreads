const updateBook = (books, book, newShelfvalue) => {
  const updatedBooks = books.map(b => {
    if (b.id === book.id) {
      return { ...b, shelf: newShelfvalue };
    } else {
      return b;
    }
  });
  return updatedBooks;
};

const updateOrAddBook = (books, book, newShelfvalue) => {
  const updatedBooks = updateBook(books, book, newShelfvalue);

  const bookFoundIndex = updatedBooks.findIndex(b => b.id === book.id);
  if (bookFoundIndex === -1) {
    return [...updatedBooks, { ...book, shelf: newShelfvalue }];
  }
  return updatedBooks;
};

export { updateBook, updateOrAddBook };
