import React, { Component } from 'react';
//import Clock from 'react-clock';
import Clock from 'react-clock/dist/entry.nostyle';
import './App.css';


const mainStyle = {
  backgroundColor: 'black',
  color: 'white',
  display: 'block',
  overflowX: 'hidden',
  overflowY: 'hidden',

};

class App extends Component {
  state = {
    date: new Date(),
  }

  componentDidMount() {
    setInterval(
      () => { this.setState({date:new Date()}) },
      1000
    );
  }

  render() {
    return (
      <div>
        <Clock size={200} value={this.state.date}/>
      </div>
    );
  }
}

export default App;
