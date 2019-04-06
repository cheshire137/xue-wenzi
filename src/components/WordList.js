import React, { Component } from 'react';
import SortMenu from './SortMenu';
import WordListItem from './WordListItem';

class WordList extends Component {
  render() {
    const { words, onSortChange, sort } = this.props
    const totalWords = words.length;
    const midIndex = Math.ceil(totalWords / 2);
    const leftWords = words.slice(0, midIndex);
    const rightWords = words.slice(midIndex, totalWords);

    return (
      <div>
        <div className="border-bottom pb-2 d-flex flex-items-center flex-justify-between mb-2">
          <h2
            className="text-normal f3"
          >
            {totalWords < 1 ? (
              <span>0 words or phrases</span>
            ) : (
              <span>{totalWords} word{totalWords === 1 ? null : 's'} and phrase{totalWords === 1 ? null : 's'}</span>
            )}
          </h2>
          {totalWords > 0 ? (
            <SortMenu
              sort={sort}
              onChange={onSortChange}
            />
          ) : null}
        </div>
        {words.length > 0 ? (
          <div className="clearfix">
            <div className="col-6 float-left">
              <ul>
                {leftWords.map(word => (
                  <WordListItem
                    {...word}
                    key={word.value}
                    editWord={() => this.props.editWord(word)}
                  />
                ))}
              </ul>
            </div>
            {rightWords.length > 0 ? (
              <div className="col-6 float-left">
                <ul>
                  {rightWords.map(word => (
                    <WordListItem
                      {...word}
                      key={word.value}
                      editWord={() => this.props.editWord(word)}
                    />
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <p>You haven't added any learned words or phrases yet.</p>
        )}
      </div>
    );
  }
}

export default WordList;
