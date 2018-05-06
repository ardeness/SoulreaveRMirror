import React, { Component } from 'react';
import GifPlayer from 'react-gif-player';
import Rodal from 'rodal';
import Websocket from 'react-websocket';
import YouTube from 'react-youtube';

import 'rodal/lib/rodal.css';
import './App.css';

import ai_listening from './ai_listening.gif';
import Clock from './Clock';
import Weather from './Weather';

const modalStyle = {
    backgroundColor: 'black'
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: false, request: '', musicPlayer: undefined };
  }

  componentDidMount() {
  }

  messageHandler = (msg) => {
    let response = JSON.parse(msg);
    console.log(response);
    if(response.status === 'listening') {
      this.show();
    }
    else if(response.status === 'responding') {
      this.hide();
      this.setState({request:response.request});
      if(response.request === 'play music') {
        if(this.state.musicPlayer) this.state.musicPlayer.playVideo();
      }      
      else if(response.request === 'stop music') {
        if(this.state.musicPlayer) this.state.musicPlayer.stopVideo();
      }      
      else if(response.request === 'pause music') {
        if(this.state.musicPlayer) this.state.musicPlayer.pauseVideo();
      }
      else if(response.request === 'resume music') {
        if(this.state.musicPlayer) this.state.musicPlayer.playVideo();
      }
    }
  }

  onOpen = () => {
    console.log("Connected");
  }

  show = () => {
    this.setState({visible:true});
  }

  hide = () => {
    this.setState({visible:false});
  }

  youtubeOnReady = event => {
    event.target.setVolume(40);
    event.target.playVideo();
    this.setState({musicPlayer: event.target});
  }

  render() {
    const opts= {
      width: '600',
      height: '338',
      playerVars: { 
        autoplay: 1,
        listType: 'search',
        list: 'jazz',
        controls: 0,
        disablekb: 1,
        fs: 0,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        color: 'white'
      }
    };

    return (
      <div>
        <Websocket url='ws://127.0.0.1:8765/' onMessage={this.messageHandler} onOpen={this.onOpen} />
        <Clock/>
        <Weather/>
        <Rodal
          animation={'fade'}
          visible={this.state.visible}
          onClose={this.hide}
          duration={1000}
          customStyles={modalStyle}
          showCloseButton={false}
        >
          <div style={{width:'100%', display: 'flex', justifyContent:'center'}}>
            <GifPlayer gif={ai_listening} autoplay={true} width={200}/>
          </div>
        </Rodal>
        <div style={{width:'100%', display: 'none', justifyContent:'center'}}>
          <YouTube
            opts={opts}
            onReady={this.youtubeOnReady}   
          />
        </div>
        <div>{this.state.request}</div>
      </div>
    );
  }
}

export default App;
