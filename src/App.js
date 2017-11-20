import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './Components/ListBooks';
import Search from './Components/Search';
import './App.css';

const BooksApp = () => (
  <div className="app">
    <Route exact path="/" component={ListBooks} />
    <Route path="/search" component={Search} />
  </div>
);

export default BooksApp;
