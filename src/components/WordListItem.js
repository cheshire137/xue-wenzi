import React, { Component } from 'react';
import WordType from './WordType';

class WordListItem extends Component {
  render() {
    const { value, translation, type, pinyin } = this.props;

    return (
      <li>
        <div className="mb-2">
          {value}
          {translation ? (
            <span>
              &mdash; {translation}
            </span>
          ) : null}
          <div>
            <span className="Label mr-2 Label--gray">{pinyin}</span>
            <WordType type={type} />
          </div>
        </div>
      </li>
    );
  }
}

export default WordListItem;
