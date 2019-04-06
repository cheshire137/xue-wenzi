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
    this.setState(prevState => ({
      value: '',
      pinyin: '',
      type: '',
      translation: ''
    }))
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
          className="text-gray f6 mb-2"
        >Add a word or phrase</h2>
        <div className="form-group mt-0">
          <label
            htmlFor="word-field"
            className="mb-1 d-block"
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
        </div>
        <WordTypeSelect
          type={this.state.type}
          onChange={this.onTypeChange}
        />
        <div className="form-group">
          <label
            htmlFor="pinyin-field"
            className="mb-1 d-block"
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
        </div>
        <div className="form-group">
          <label
            htmlFor="translation-field"
            className="mb-1 d-block"
          >English translation:</label>
          <input
            type="text"
            placeholder="e.g., book"
            id="translation-field"
            className="form-control"
            onChange={this.onTranslationChange}
            value={this.state.translation}
          />
        </div>
        <button className="btn" type="submit">
          Save
        </button>
      </form>
    )
  }
}

export default WordForm;
