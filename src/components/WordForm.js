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
  }

  render() {
    return (
      <form onSubmit={this.save}>
        <div className="form-group">
          <label
            htmlFor="word-field"
          >Chinese word:</label>
          <input
            type="text"
            required
            id="word-field"
            className="form-control m-1"
            onChange={this.onValueChange}
            value={this.state.value}
          />
        </div>
        <WordTypeSelect
          type={this.state.type}
          onChange={this.onTypeChange}
        />
        <div className="form-group">
          <label
            htmlFor="pinyin-field"
          >Pinyin:</label>
          <input
            type="text"
            required
            id="pinyin-field"
            className="m-1 form-control"
            onChange={this.onPinyinChange}
            value={this.state.pinyin}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="translation-field"
          >English translation:</label>
          <input
            type="text"
            required
            id="translation-field"
            className="m-1 form-control"
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
