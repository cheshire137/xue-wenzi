import React, { Component } from 'react';
import './App.css';
import WordList from './components/WordList';
import ChineseWord from './models/ChineseWord';
import WordForm from './components/WordForm';
import WordTypeFilter from './components/WordTypeFilter';
import ExportButton from './components/ExportButton';
import ImportButton from './components/ImportButton';

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
      wordTypeFilter: 'all',
      notice: ''
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

  deleteWord = word => {
    word.delete();
    this.refreshWords();
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

  flashNotice = notice => {
    this.setState(prevState => ({ notice }), () => {
      window.setTimeout(() => {
        this.setState(prevState => ({ notice: '' }));
      }, 3000);
    });
  };

  importedWords = newWords => {
    if (newWords.length < 1) {
      return;
    }
    this.refreshWords();
    const wordValues = newWords.map(word => word.value).join(', ');
    this.flashNotice(`Imported: ${wordValues}`);
  };

  render() {
    const { words, sort, editingPinyin, editingType, visibleWords,
            editingTranslation, editingValue, wordTypeFilter,
            notice } = this.state;
    const wordTypesAndCounts = getWordTypesAndCounts(words);

    return (
      <div className="app-wrapper">
        <header className="app-header mb-3">
          <div className="container-lg pb-2 d-flex flex-items-end flex-justify-between">
            <h1
              className="pt-4 app-title"
            >学文字</h1>
            {notice.length > 0 ? (
              <h2>{notice}</h2>
            ) : null}
            {words.length > 0 ? (
              <ExportButton words={words} />
            ) : null}
            <ImportButton
              knownWordValues={words.map(word => word.value)}
              onImportComplete={this.importedWords}
            />
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
              deleteWord={this.deleteWord}
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
