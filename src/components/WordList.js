import React, { Component } from 'react';
import SortMenu from './SortMenu';

class WordList extends Component {
  render() {
    const { words, onSortChange, sort } = this.props

    return (
      <div>
        <SortMenu
          sort={sort}
          onChange={onSortChange}
        />
        <ul>
          {words.map(word => (
            <li key={word.value}>
              <div className="mb-2">
                {word.value} &mdash; {word.translation}
                <div>
                  <span className="Label mr-2 Label--gray">{word.pinyin}</span>
                  {word.type === 'noun' ? (
                     <span className="text-small text-gray">n.</span>
                   ) :
                   word.type === 'verb' ? (
                     <span className="text-small text-gray">v.</span>
                   ) :
                   word.type === 'adjective' ? (
                     <span className="text-small text-gray">adj.</span>
                   ) :
                   word.type === 'adverb' ? (
                     <span className="text-small text-gray">adv.</span>
                   ) :
                   word.type === 'pronoun' ? (
                     <span className="text-small text-gray">pro.</span>
                   ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default WordList;
