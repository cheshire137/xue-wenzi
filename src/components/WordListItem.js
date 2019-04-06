import React, { Component } from 'react';
import WordType from './WordType';

class WordListItem extends Component {
  render() {
    const { value, translation, type, pinyin, editWord } = this.props;

    return (
      <li>
        <div className="mb-2 d-flex flex-items-start">
          <div>
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
          <button
            type="button"
            onClick={editWord}
            className="btn-link ml-4 mt-1 text-small"
          >Edit</button>
        </div>
      </li>
    );
  }
}

export default WordListItem;
