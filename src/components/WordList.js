import React, { Component } from 'react';

class WordList extends Component {
  render() {
    const { words } = this.props

    return (
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
                 ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default WordList;
