import React, { Component } from 'react';

class WordType extends Component {
  render() {
    const { type, className } = this.props;

    if (typeof type !== 'string' || type.trim().length < 1) {
      return null;
    }

    return (
      <span className={className}>
        {type === 'noun' ? (
           <span>n.</span>
         ) :
         type === 'verb' ? (
           <span>v.</span>
         ) :
         type === 'adjective' ? (
           <span>adj.</span>
         ) :
         type === 'adverb' ? (
           <span>adv.</span>
         ) :
         type === 'pronoun' ? (
           <span>pro.</span>
         ) : (
           <span>{type}</span>
         )}
      </span>
    );
  }
}

export default WordType;
