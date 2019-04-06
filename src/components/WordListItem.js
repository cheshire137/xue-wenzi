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
      <li className="word-list-item mb-3 d-flex f3 flex-items-start">
        <div>
          <div className="d-flex flex-items-center lh-condensed">
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
            <WordType
              type={type}
              className="ml-2 text-gray f5"
            />
          </div>
          <div>
            <span className="Label f5 Label--gray">{pinyin}</span>
            <div className="f6 show-on-hover ml-3">
              <button
                type="button"
                onClick={editWord}
                className="btn-link link-gray"
              ><FontAwesomeIcon icon="pen" /></button>
              <button
                type="button"
                onClick={deleteWord}
                className="btn-link link-gray ml-3"
              ><FontAwesomeIcon icon="trash" /></button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default WordListItem;
