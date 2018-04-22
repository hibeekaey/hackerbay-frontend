import React, { Component } from 'react';

import './App.css';

import Mushroom from '../components/Mushroom';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      width: 0,
      height: 0,
      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const cells = current.cells.slice();
    
    cells[i] = null;
    
    this.setState({
      history: history.concat([{
        cells: cells,
      }]),
      stepNumber: history.length
    });
  }

  componentWillMount() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);

    const width = parseInt(prompt('Please enter board Width'), 10);
    const height = parseInt(prompt('Please enter board Height'), 10);

    let totalCells = (width > 10 ? 10 : width) * (height > 10 ? 10 : height);

    this.setState({
      history: history.concat([{
        cells: Array(totalCells).fill(<Mushroom />)
      }]),
      width: (width > 10 ? 10 : width),
      height: (height > 10 ? 10 : height),
      stepNumber: history.length
    });
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

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
