import Database from './Database';
const wordsKey = 'words';

class ChineseWord {
  static findAll() {
    const wordMap = Database.get(wordsKey) || {};
    const wordData = Object.values(wordMap);
    return wordData.map(data => new ChineseWord(data));
  }

  constructor(args) {
    this.value = args.value;
    this.translation = args.translation;
    this.pinyin = args.pinyin;
    this.type = args.type;
  }

  save() {
    const wordMap = Database.get(wordsKey) || {};
    wordMap[this.value] = {
      value: this.value,
      translation: this.translation,
      pinyin: this.pinyin,
      type: this.type
    };
    Database.set(wordsKey, wordMap);
  }
}

export default ChineseWord;
