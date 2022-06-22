'use strict';

const e = React.createElement;

class ExportButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'Export Successful.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Export to CSV'
    );
  }
}

const domContainer = document.querySelector('#export_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(ExportButton));