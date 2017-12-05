import React, { Component } from 'react';

class ShelfChanger extends Component {
  state = {
    value: 'none'
  };

  componentDidMount() {
    if (this.props.book.shelf) {
      this.setState({
        value: this.props.book.shelf
      });
    }
  }

  handleChange = event => {
    const { book, onShelfChange } = this.props;
    const prevState = this.state;
    const { value } = event.target;
    this.setState({ value });

    const undo = () => this.setState(prevState);
    onShelfChange(book, value, undo);
  };

  render() {
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
      </div>
    );
  }
}

export default ShelfChanger;
