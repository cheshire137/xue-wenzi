import React, { Component } from 'react';
import ChineseWord from '../models/ChineseWord';

class ImportButton extends Component {
  onFileLoaded = event => {
    const { knownWordValues, onImportComplete } = this.props;
    const text = event.srcElement.result;
    const wordList = JSON.parse(text);
    const newWords = [];

    for (const wordData of wordList) {
      const word = new ChineseWord(wordData);
      if (knownWordValues.length < 1 || knownWordValues.indexOf(word.value) < 0) {
        newWords.push(word);
      }
      word.save();
    }

    onImportComplete(newWords);
  };

  onFileSelected = event => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('loadend', this.onFileLoaded);
    reader.readAsText(file);
  };

  import = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', this.onFileSelected, false);
    fileInput.click();
  };

  render() {
    return (
      <button
        type="button"
        onClick={this.import}
        className="btn-link ml-3 header-link"
      >Import</button>
    );
  }
}

export default ImportButton;
