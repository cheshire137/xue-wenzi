import Database from './Database';
const wordsKey = 'words';

class ChineseWord {
  static findAll(sort) {
    const wordMap = Database.get(wordsKey) || {};
    const wordData = Object.values(wordMap);

    const words = wordData.map(data => new ChineseWord(data));
    if (sort === 'date') {
      return words.reverse();
    }

    return words.sort((a, b) => {
      const aValue = a[sort];
      const bValue = b[sort];

      if (aValue < bValue) {
        return -1
      }

      return aValue > bValue ? 1 : 0;
    });
  }

  constructor(args) {
    this.value = args.value;
    this.translation = args.translation;
    this.pinyin = args.pinyin;
    this.type = args.type;
  }

  delete() {
    const wordMap = Database.get(wordsKey) || {};
    delete wordMap[this.value];
    Database.set(wordsKey, wordMap);
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
