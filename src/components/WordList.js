import React, { Component } from 'react';
import SortMenu from './SortMenu';
import WordListItem from './WordListItem';

function getUnitsFor(count, type) {
  if (type === 'all') {
    if (count === 1) {
      return 'word or phrase';
    }
    const conjunction = count < 1 ? 'or' : 'and';
    return `words ${conjunction} phrases`;
  }

  let displayType = type;
  if (type === 'measure') {
    displayType = 'measure word';
  }

  return `${displayType}${count === 1 ? '' : 's'}`;
}

class WordList extends Component {
  render() {
    const { words, onSortChange, sort, wordTypeFilter } = this.props
    const totalWords = words.length;
    const midIndex = Math.ceil(totalWords / 2);
    const leftWords = words.slice(0, midIndex);
    const rightWords = words.slice(midIndex, totalWords);
    const units = getUnitsFor(totalWords, wordTypeFilter);

    return (
      <div>
        <div className="border-bottom pb-2 d-flex flex-items-center flex-justify-between mb-2">
          <h2
            className="text-normal f3"
          >{totalWords} {units}</h2>
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
                    deleteWord={() => this.props.deleteWord(word)}
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
                      deleteWord={() => this.props.deleteWord(word)}
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
