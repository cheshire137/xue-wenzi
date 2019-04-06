import React, { Component } from 'react';
import SortMenu from './SortMenu';

class WordList extends Component {
  render() {
    const { words, onSortChange, sort } = this.props

    return (
      <div>
        <div className="border-bottom pb-2 d-flex flex-items-center flex-justify-between mb-2">
          <h2
            className="text-normal f3"
          >
            {words.length < 1 ? (
              <span>0 words or phrases</span>
            ) : (
              <span>{words.length} word{words.length === 1 ? null : 's'} and phrase{words.length === 1 ? null : 's'}</span>
            )}
          </h2>
          {words.length > 0 ? (
            <SortMenu
              sort={sort}
              onChange={onSortChange}
            />
          ) : null}
        </div>
        {words.length > 0 ? (
          <ul>
            {words.map(word => (
              <li key={word.value}>
                <div className="mb-2">
                  {word.value}
                  {word.translation ? (
                    <span>
                      &mdash; {word.translation}
                    </span>
                  ) : null}
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
                     ) :
                     word.type === 'measure' ? (
                       <span className="text-small text-gray">measure</span>
                     ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't added any learned words or phrases yet.</p>
        )}
      </div>
    );
  }
}

export default WordList;
