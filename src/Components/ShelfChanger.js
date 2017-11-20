import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import * as BooksAPI from '../utils/BooksAPI';
import If from './If';

class ShelfChanger extends Component {
  state = {
    value: 'none',
    loading: false
  };

  componentDidMount() {
    if (this.props.book.shelf) {
      this.setState({
        value: this.props.book.shelf
      });
    }
  }

  handleChange = event => {
    const { book } = this.props;
    const { value } = event.target;
    this.setState({ value, loading: true });

    BooksAPI.update(book, value).then(res => {
      if (this.props.onChange) {
        this.props.onChange(res, book.id, value);
      }
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="book-shelf-changer">
        <select onChange={this.handleChange} value={this.state.value}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>

        <If test={loading}>
          <center>
            <ReactLoading type="bubbles" color="#444" />
          </center>
        </If>
      </div>
    );
  }
}

export default ShelfChanger;
