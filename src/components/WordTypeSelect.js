import React, { Component } from 'react';

class WordTypeSelect extends Component {
  onChange = event => {
    const type = event.target.value;
    this.props.onChange(type);
  }

  render() {
    return (
      <div className="form-group">
        <label
          htmlFor="type-field"
          className="mr-1"
        >Word type:</label>
        <select
          id="type-field"
          onChange={this.onChange}
          value={this.props.type}
          className="form-select"
        >
          <option>Choose a type</option>
          <option value="noun">noun</option>
          <option value="verb">verb</option>
          <option value="adjective">adjective</option>
          <option value="adverb">adverb</option>
          <option value="pronoun">pronoun</option>
          <option value="measure">measure</option>
        </select>
      </div>
    );
  }
}

export default WordTypeSelect;
