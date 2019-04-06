import React, { Component } from 'react';
import './WordTypeFilter.css';

class WordTypeFilter extends Component {
  changeFilter = event => {
    this.props.filterWordsByType(event.target.value);
  };

  render() {
    const { wordTypesAndCounts, activeFilter } = this.props;
    const wordTypes = Object.keys(wordTypesAndCounts);
    const totalWords = Object.values(wordTypesAndCounts)
                             .reduce((total, num) => total + num);

    return (
      <div>
        <h3
          className="f6 text-gray mb-2"
        >Filter words</h3>
        <ul className="filter-list">
          <li>
            <button
              value="all"
              type="button"
              className={`btn-link width-full text-left filter-item${activeFilter === 'all' ? ' selected' : ''}`}
              onClick={this.changeFilter}
            >
              <span className="count" title="words">{totalWords}</span>
              All
            </button>
          </li>
          {wordTypes.map(wordType => {
            const isActive = activeFilter === wordType;

            return (
              <li key={wordType}>
                <button
                  value={wordType}
                  type="button"
                  className={`btn-link width-full text-left filter-item${isActive ? ' selected' : ''}`}
                  onClick={this.changeFilter}
                >
                  <span className="count" title="words">{wordTypesAndCounts[wordType]}</span>
                  {wordType}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default WordTypeFilter;
