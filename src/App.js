import React, { Component } from 'react';
import './App.css';
import WordList from './components/WordList';
import ChineseWord from './models/ChineseWord';
import WordForm from './components/WordForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { words: [], sort: 'date' };
  }

  componentDidMount() {
    this.refreshWords();
  }

  onSortChange = sort => {
    this.setState(prevState => ({ sort }), () => this.refreshWords());
  }

  refreshWords = () => {
    const words = ChineseWord.findAll(this.state.sort);
    this.setState(prevState => ({ words }));
  }

  render() {
    const { words, sort } = this.state

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
              />
            </div>
            <div className="col-6 float-left">
              <WordForm onSave={this.refreshWords} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
