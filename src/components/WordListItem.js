import React, { Component } from 'react';
import WordType from './WordType';
import SpeakButton from './SpeakButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WordListItem.css';

class WordListItem extends Component {
  render() {
    const { value, translation, type, pinyin, editWord,
            deleteWord } = this.props;

    return (
      <li className="word-list-item mb-2 d-flex f3 flex-items-start">
        <div>
          <div className="d-flex flex-items-center">
            {value}
            <SpeakButton
              value={value}
              className="btn-link mx-1 f6 v-align-middle"
            />
            {translation ? (
              <span
                className="d-inline-block ml-2"
              >{translation}</span>
            ) : null}
          </div>
          <div>
            <span className="Label mr-2 f4 Label--gray">{pinyin}</span>
            <WordType type={type} />
          </div>
        </div>
        <div className="f6 show-on-hover ml-3 mt-2">
          <button
            type="button"
            onClick={editWord}
            className="btn-link"
          ><FontAwesomeIcon icon="pen" /></button>
          <button
            type="button"
            onClick={deleteWord}
            className="btn-link ml-3"
          ><FontAwesomeIcon icon="trash" /></button>
        </div>
      </li>
    );
  }
}

export default WordListItem;
