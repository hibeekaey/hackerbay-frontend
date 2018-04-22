import React, { Component } from 'react';

import './App.css';

import Mushroom from '../components/Mushroom';
import Mario from '../components/Mario';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.moves + 1);
    const current = history[history.length - 1];
    const cells = current.cells.slice();

    let backward = (i === this.state.currentPosition - 1);
    let forward = (i === this.state.currentPosition + 1);
    let upward = (i === this.state.currentPosition - this.state.width);
    let downward = (i == this.state.currentPosition + this.state.width);

    if (backward || forward || upward || downward) {
      cells[this.state.currentPosition] = null;
      cells[i] = <Mario />;
      
      this.setState({
        history: history.concat([{
          cells: cells,
        }]),
        moves: history.length,
        currentPosition: i
      });
    }
  }

  componentWillMount() {
    const width = parseInt(prompt('Please enter board Width'), 10) || 0;
    const height = parseInt(prompt('Please enter board Height'), 10) || 0;

    this.setState({
      history: [{
        cells: Array(0)
      }],
      width: (width > 10 ? 10 : (width < 3 ? 3 : width)),
      height: (height > 10 ? 10 : (height < 3 ? 3 : height)),
      moves: 0
    });
  }

  componentDidMount() {
    const history = this.state.history.slice(0, this.state.moves + 1);
    const totalCells = this.state.width * this.state.height;

    const mushroomCells = Array(Math.max(this.state.width, this.state.height)).fill(null).map(() => Math.round(Math.random() * totalCells));
    const marioCell = Math.round(Math.random() * totalCells);
    const cells = Array(totalCells).fill(null);
    
    mushroomCells.forEach((cell) => {
      cells[cell] = <Mushroom />;
    });

    cells[marioCell] = <Mario />;

    this.setState({
      history: history.concat([{
        cells: cells
      }]),
      moves: history.length,
      currentPosition: marioCell
    });
  }

  componentWillUnmount() {

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.moves];

    return (
      <div className="App">
        <h1 className="App-title">Mushroom Mario</h1>
        
        <Board
          width={this.state.width}
          height={this.state.height}
          cells={current.cells}
          onClick={(i) => this.handleClick(i)}
        />
      </div>
    );
  }
}

export default App;
