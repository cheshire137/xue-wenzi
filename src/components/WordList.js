import React, { Component } from 'react';
import { Box, Label, Text } from '@primer/components';

class WordList extends Component {
  render() {
    const { words } = this.props

    return (
      <ul>
        {words.map(word => (
          <li key={word.value}>
            <Box mb={2}>
              {word.value} &mdash; {word.translation}
              <div>
                <Label outline mr={2}>{word.pinyin}</Label>
                {word.type === 'noun' ? (
                   <Text fontSize={1} color="gray.6">n.</Text>
                 ) :
                 word.type === 'verb' ? (
                   <Text fontSize={1} color="gray.6">v.</Text>
                 ) :
                 word.type === 'adjective' ? (
                   <Text fontSize={1} color="gray.6">adj.</Text>
                 ) :
                 word.type === 'adverb' ? (
                   <Text fontSize={1} color="gray.6">adv.</Text>
                 ) : null}
              </div>
            </Box>
          </li>
        ))}
      </ul>
    );
  }
}

export default WordList;
