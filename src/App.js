import React, { Component } from 'react';
import './App.css';
import WordList from './components/WordList';
import ChineseWord from './models/ChineseWord';
import WordForm from './components/WordForm';
import { Box } from '@primer/components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { words: [] };
  }

  componentDidMount() {
    this.refreshWords();
  }

  refreshWords = () => {
    const words = ChineseWord.findAll();
    this.setState(prevState => ({ words }));
  }

  render() {
    const { words } = this.state

    return (
      <Box p={3}>
        <WordList words={words} />
        <WordForm onSave={this.refreshWords} />
      </Box>
    );
  }
}

export default App;
