import React, { Component } from 'react';
import './App.css';
import WordList from './components/WordList';
import ChineseWord from './models/ChineseWord';
import WordForm from './components/WordForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      sort: 'date',
      editingValue: '',
      editingTranslation: '',
      editingType: '',
      editingPinyin: ''
    };
  }

  componentDidMount() {
    this.refreshWords();
  }

  onSortChange = sort => {
    this.setState(prevState => ({ sort }), () => this.refreshWords());
  };

  refreshWords = () => {
    const words = ChineseWord.findAll(this.state.sort);
    this.setState(prevState => ({ words }));
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

  render() {
    const { words, sort, editingPinyin, editingType,
            editingTranslation, editingValue } = this.state;

    return (
      <div>
        <header>
          <div className="container">
            <h1 className="my-4">学文字</h1>
          </div>
        </header>
        <div className="container">
          <div className="clearfix">
            <div className="col-6 float-left">
              <WordList
                words={words}
                sort={sort}
                onSortChange={this.onSortChange}
                editWord={this.editWord}
              />
            </div>
            <div className="col-4 float-left">
              <WordForm
                onSave={this.onWordSave}
                pinyin={editingPinyin}
                translation={editingTranslation}
                value={editingValue}
                type={editingType}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
