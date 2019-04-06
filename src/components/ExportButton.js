import React, { Component } from 'react';

function getDateString(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

class ExportButton extends Component {
  export = () => {
    const { words } = this.props;
    const data = JSON.stringify(words);
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = getDateString(new Date());
    const event = document.createEvent('MouseEvents');

    link.setAttribute('href', url);
    link.setAttribute('download', `chinese-vocabulary-${dateStr}.json`);
    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
  };

  render() {
    return (
      <button
        type="button"
        onClick={this.export}
        className="btn-link header-link"
      >Export</button>
    );
  }
}

export default ExportButton;
