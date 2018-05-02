import React, { Component } from 'react';

import GifPlayer from 'react-gif-player';

import siri_like from './siri_like.gif';
import ai_listening from './ai_listening.gif';

import './App.css';

import Clock from './Clock';
import Weather from './Weather';

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Clock/>
        <Weather/>
        <GifPlayer gif={siri_like} autoplay={true}/>
      </div>
    );
  }
}

export default App;
