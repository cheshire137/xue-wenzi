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
          className="mb-1 d-block"
        >Word or phrase type:</label>
        <select
          id="type-field"
          onChange={this.onChange}
          value={this.props.type}
          className="form-select"
        >
          <option>Choose a type</option>
          <optgroup label="Words">
            <option value="noun">noun</option>
            <option value="verb">verb</option>
            <option value="adjective">adjective</option>
            <option value="adverb">adverb</option>
            <option value="pronoun">pronoun</option>
            <option value="measure">measure</option>
          </optgroup>
          <optgroup label="Phrases">
            <option value="greeting">greeting</option>
            <option value="idiom">idiom</option>
            <option value="phrase">phrase</option>
          </optgroup>
        </select>
      </div>
    );
  }
}

export default WordTypeSelect;
