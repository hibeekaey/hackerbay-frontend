import React from 'react';
import ReactDOM from 'react-dom';

import Board from './Board';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    cells: Array(9),
    cols: 3,
    rows: 3
  };

  ReactDOM.render(<Board cols={props.cols} rows={props.rows} cells={props.cells} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
