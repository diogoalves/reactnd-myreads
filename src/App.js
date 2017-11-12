import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import ListBooks from './Components/ListBooks';
import Search from './Components/Search';

// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={ListBooks} />
        <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
