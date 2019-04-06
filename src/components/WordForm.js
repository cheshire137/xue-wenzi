import React, { Component } from 'react';
import ChineseWord from '../models/ChineseWord';
import WordTypeSelect from './WordTypeSelect';

class WordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      translation: props.translation || '',
      pinyin: props.pinyin || '',
      type: props.type || ''
    };
  }

  onValueChange = event => {
    const value = event.target.value
    this.setState(prevState => ({ value }))
  }

  onPinyinChange = event => {
    const pinyin = event.target.value
    this.setState(prevState => ({ pinyin }))
  }

  onTranslationChange = event => {
    const translation = event.target.value;
    this.setState(prevState => ({ translation }));
  }

  onTypeChange = type => {
    this.setState(prevState => ({ type }));
  }

  save = event => {
    event.preventDefault();

    const value = this.state.value.trim();
    const pinyin = this.state.pinyin.trim();
    const type = this.state.type;
    const translation = this.state.translation.trim();

    const word = new ChineseWord({
      value, pinyin, type, translation
    });
    word.save();

    this.props.onSave();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState(prevState => ({ value: this.props.value }))
    }
    if (prevProps.type !== this.props.type) {
      this.setState(prevState => ({ type: this.props.type }))
    }
    if (prevProps.translation !== this.props.translation) {
      this.setState(prevState => ({ translation: this.props.translation }))
    }
    if (prevProps.pinyin !== this.props.pinyin) {
      this.setState(prevState => ({ pinyin: this.props.pinyin }))
    }
  }

  render() {
    return (
      <form
        onSubmit={this.save}
        className="ml-6"
      >
        <h2
          className="text-normal f3 border-bottom pb-2 mb-2"
        >Add a word or phrase</h2>
        <div className="form-group mt-0">
          <label
            htmlFor="word-field"
            className="mr-1"
          >Chinese word or phrase:</label>
          <input
            type="text"
            required
            id="word-field"
            className="form-control"
            onChange={this.onValueChange}
            value={this.state.value}
            placeholder="e.g., 书"
          />
          <p className="note">
            What Chinese word or phrase did you learn?
          </p>
        </div>
        <WordTypeSelect
          type={this.state.type}
          onChange={this.onTypeChange}
        />
        <div className="form-group">
          <label
            htmlFor="pinyin-field"
            className="mr-1"
          >Pinyin:</label>
          <input
            type="text"
            required
            id="pinyin-field"
            placeholder="e.g., shū"
            className="form-control"
            onChange={this.onPinyinChange}
            value={this.state.pinyin}
          />
          <p className="note">
            How do you pronounce the word or phrase?
          </p>
        </div>
        <div className="form-group">
          <label
            htmlFor="translation-field"
            className="mr-1"
          >English translation:</label>
          <input
            type="text"
            placeholder="e.g., book"
            id="translation-field"
            className="form-control"
            onChange={this.onTranslationChange}
            value={this.state.translation}
          />
          <p className="note">
            What does the word or phrase mean in English?
          </p>
        </div>
        <button className="btn" type="submit">
          Save
        </button>
      </form>
    )
  }
}

export default WordForm;
