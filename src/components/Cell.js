import React from 'react';

function Cell(props) {
  return (
    <button className="Board-cell" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Cell;