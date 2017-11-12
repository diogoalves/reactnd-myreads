import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI';

class ShelfChanger extends Component {

  state = {
    value: this.props.book.shelf
  }

  handleChange = (event) => {
    const { book } = this.props;
    const { value } = event.target;
    this.setState({ value });
    
    BooksAPI.update(book, value).then((res) => {
      console.log(res);
    })
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={this.handleChange} value={this.state.value}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>      
    );
  }
}

export default ShelfChanger;