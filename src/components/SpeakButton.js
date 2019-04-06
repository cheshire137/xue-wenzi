import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function getVoices() {
  return new Promise(resolve => {
    let voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
      resolve(voices);
    };
  });
}

async function chooseVoice(language, voiceIndex) {
  const allVoices = await getVoices();
  const voices = allVoices.filter(voice => voice.lang === language);
  return new Promise(resolve => {
    resolve(voices[voiceIndex]);
  });
}

class SpeakButton extends Component {
  speak = async () => {
    const { value } = this.props;
    const message = new SpeechSynthesisUtterance(value);
    const language = 'zh-CN';
    message.voice = await chooseVoice(language, 0);
    speechSynthesis.speak(message);
  };

  render() {
    if (!speechSynthesis) {
      return null;
    }

    return (
      <button
        type="button"
        className="btn-link mx-1 f6 v-align-middle"
        onClick={this.speak}
      >
        <FontAwesomeIcon icon="play-circle" />
      </button>
    );
  }
}

export default SpeakButton;
