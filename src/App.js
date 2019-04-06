import React, { Component } from 'react';
import './App.css';
import WordList from './components/WordList';
import ChineseWord from './models/ChineseWord';
import WordForm from './components/WordForm';
import WordTypeFilter from './components/WordTypeFilter';

function getWordTypesAndCounts(words) {
  const typesAndCounts = {};

  for (const word of words) {
    if (!(word.type in typesAndCounts)) {
      typesAndCounts[word.type] = 0;
    }
    typesAndCounts[word.type]++;
  }

  return typesAndCounts;
}

function encodeString(str) {
  const out = [];
  for (let i = 0; i < str.length; i++) {
    out[i] = str.charCodeAt(i);
  }
  return new Uint8Array(out);
}

function getDateString(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      visibleWords: [],
      sort: 'date',
      editingValue: '',
      editingTranslation: '',
      editingType: '',
      editingPinyin: '',
      wordTypeFilter: 'all'
    };
  }

  componentDidMount() {
    this.refreshWords();
  }

  onSortChange = sort => {
    this.setState(prevState => ({ sort }), () => this.refreshWords());
  };

  filterWords = (words, typeFilter) => {
    if (typeFilter === 'all') {
      return words;
    }

    return words.filter(word => word.type === typeFilter);
  };

  refreshWords = () => {
    const words = ChineseWord.findAll(this.state.sort);
    this.setState(prevState => ({
      words,
      visibleWords: this.filterWords(words, this.state.wordTypeFilter)
    }));
  };

  editWord = word => {
    this.setState(prevState => ({
      editingPinyin: word.pinyin,
      editingTranslation: word.translation,
      editingValue: word.value,
      editingType: word.type
    }));
  };

  onWordSave = () => {
    this.refreshWords();
    this.setState(prevState => ({
      editingPinyin: '',
      editingTranslation: '',
      editingValue: '',
      editingType: ''
    }));
  };

  changeWordTypeFilter = type => {
    this.setState(prevState => ({
      wordTypeFilter: type,
      visibleWords: this.filterWords(this.state.words, type)
    }));
  };

  exportWords = () => {
    const { words } = this.state;
    const data = encodeString(JSON.stringify(words));
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = getDateString(new Date());
    link.setAttribute('href', url);
    link.setAttribute('download', `chinese-vocabulary-${dateStr}.json`);
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
  };

  render() {
    const { words, sort, editingPinyin, editingType, visibleWords,
            editingTranslation, editingValue, wordTypeFilter } = this.state;
    const wordTypesAndCounts = getWordTypesAndCounts(words);

    return (
      <div className="app-wrapper">
        <header className="app-header mb-3">
          <div className="container-lg pb-2 d-flex flex-items-end flex-justify-between">
            <h1
              className="pt-4 app-title"
            >学文字</h1>
            {words.length > 0 ? (
              <button
                type="button"
                onClick={this.exportWords}
                className="btn-link header-link"
              >Export</button>
            ) : null}
          </div>
        </header>
        <main className="container-lg width-full clearfix">
          <div className="col-2 pr-6 float-left">
            {words.length > 0 ? (
              <WordTypeFilter
                activeFilter={wordTypeFilter}
                wordTypesAndCounts={wordTypesAndCounts}
                filterWordsByType={this.changeWordTypeFilter}
              />
            ) : null}
          </div>
          <div className="col-7 float-left">
            <WordList
              wordTypeFilter={wordTypeFilter}
              words={visibleWords}
              sort={sort}
              onSortChange={this.onSortChange}
              editWord={this.editWord}
            />
          </div>
          <div className="col-3 float-left">
            <WordForm
              onSave={this.onWordSave}
              pinyin={editingPinyin}
              translation={editingTranslation}
              value={editingValue}
              type={editingType}
            />
          </div>
        </main>
        <footer className="app-footer mt-4">
          <div className="container py-4 f6">
            <a
              className="link-gray"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/cheshire137/xue-wenzi"
            >View source</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
