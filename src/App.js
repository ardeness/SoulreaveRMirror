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
	<div style={{width:'100%', display: 'flex', justifyContent:'center'}}>
          <GifPlayer gif={ai_listening} autoplay={true} width={100}/>
	</div>
      </div>
    );
  }
}

export default App;
