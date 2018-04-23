import React, { Component } from 'react';

import './App.css';

import Mushroom from '../components/Mushroom';
import Mario from '../components/Mario';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{
        cells: Array(0)
      }]
    };
  }

  handleMario(i) {
    const history = this.state.history.slice(0, this.state.moves + 1);
    const current = history[history.length - 1];
    const cells = current.cells.slice();

    const back = this.state.currentPosition - 1;
    const front = this.state.currentPosition + 1;

    const backward = i === back;
    const notEdgeBackward = (back % this.state.cols) !== this.state.cols - 1;
    
    const forward = (i === front);
    const notEdgeForward = (front % this.state.cols) !== 0;
    
    const upward = (i === this.state.currentPosition - this.state.cols);
    const downward = (i === this.state.currentPosition + this.state.cols);

    if (((backward && notEdgeBackward) || (forward && notEdgeForward) || upward || downward) && i > -1 && i < cells.length) {
      cells[this.state.currentPosition] = null;
      cells[i] = <Mario />;
      
      this.setState({
        history: history.concat([{
          cells: cells,
        }]),
        moves: history.length,
        currentPosition: i
      });

      this.isPrincessSaved();
    }
  }

  isPrincessSaved() {
    const history = this.state.history.slice(0, this.state.moves + 1);
    const current = history[history.length - 1];
    const cells = current.cells.slice();
    
    if (cells.every((cell) => cell === null || cell.type === (<Mario />).type)) {
      alert(`Game over. Total moves to save princess: ${this.state.moves}`);
    }
  }

  componentWillMount() {
    const width = parseInt(prompt('Please enter board Width'), 10) || 0;
    const height = parseInt(prompt('Please enter board Height'), 10) || 0;

    const cols = (width > 10 ? 10 : (width < 3 ? 3 : width));
    const rows = (height > 10 ? 10 : (height < 3 ? 3 : height));

    const totalCells = cols * rows;

    const mushroomLength = Math.max(cols, rows);
    const mushroomCells = Array(mushroomLength).fill(null).map(() => Math.round(Math.random() * totalCells));
    
    const marioCell = Math.round(Math.random() * totalCells);
    
    const history = this.state.history.slice(0, this.state.moves + 1);
    const cells = Array(totalCells).fill(null);
    
    mushroomCells.forEach((cell) => cells[cell] = <Mushroom />);

    cells[marioCell] = <Mario />;

    this.setState({
      history: [{
        cells: cells
      }],
      cols: cols,
      rows: rows,
      moves: history.length,
      currentPosition: marioCell
    });
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();

      switch(event.key) {
      case 'ArrowLeft':
        this.handleMario(this.state.currentPosition - 1);
        break;
      case 'ArrowRight':
        this.handleMario(this.state.currentPosition + 1);  
        break;
      case 'ArrowUp':
        this.handleMario(this.state.currentPosition - this.state.cols);
        break;
      case 'ArrowDown': 
        this.handleMario(this.state.currentPosition + this.state.cols);
        break;
      default:
        break;
      }
    }, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', null);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.moves];

    return (
      <div className="App">
        <h1 className="App-title">Mushroom Mario</h1>
        
        <Board
          cols={this.state.cols}
          rows={this.state.rows}
          cells={current.cells}
          onClick={(i) => this.handleMario(i)}
        />
      </div>
    );
  }
}

export default App;
