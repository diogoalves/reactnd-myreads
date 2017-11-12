import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import ListBooks from './Components/ListBooks';
import Search from './Components/Search';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={ () => (
          <ListBooks books={books} />
        )} />
        <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp;
