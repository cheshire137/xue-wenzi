import React, { Component } from 'react';

class SortMenu extends Component {
  onChange = event => {
    const sort = event.target.value;
    this.props.onChange(sort);
  }

  render() {
    const { sort } = this.props

    return (
      <div className="form-group mt-0">
        <label
          htmlFor="sort-menu"
          className="mr-1"
        >Sort:</label>
        <select
          id="sort-menu"
          className="form-select"
          value={sort}
          onChange={this.onChange}
        >
          <option value="date">Date</option>
          <option value="pinyin">Pinyin</option>
          <option value="translation">Translation</option>
          <option value="type">Type</option>
        </select>
      </div>
    );
  }
}

export default SortMenu;
