import React, { Component } from 'react';

import './Board.css';

import Cell from '../components/Cell';

class Board extends Component {
  renderRows() {
    const length = this.props.rows;
    const array = Array(length).fill(null);
    
    const rows = array.map((row, index) => 
      <div key={index} className="Board-row">{this.renderCells(index)}</div>
    );
    
    return rows;
  }

  renderCells(row) {
    const length = this.props.cols;
    const array = Array(length).fill(null);
    const rowIndex = row * length;

    const cols = array.map((cell, index) => 
      <Cell
        key={rowIndex + index}
        value={this.props.cells[rowIndex + index]}
        onClick={() => this.props.onClick(rowIndex + index)}
      />
    );

    return cols;
  }

  render() {
    return (
      <div className="Board">{this.renderRows()}</div>
    );
  }
}

export default Board;