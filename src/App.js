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
    let opts= {
      width: '600',
      height: '338',
      playerVars: { 
        loop: 1,
        autoplay: 1,
        listType: 'search',
        list: 'jazz',
        //controls: 0,
        //disablekb: 1,
        fs: 0,
        //playsinline: 1,
        rel: 0,
        showinfo: 0,
        color: 'white'
      }
    };
    this.state = { visible: false, request: '', musicPlayer: undefined, opts };
  }

  componentDidMount() {
  }

  messageHandler = (msg) => {
    const musicCommandRegex = /(play|stop|pause|resume|next|previous)[ |\t]*([a-z|A-Z| ]*) music/;
    let response = JSON.parse(msg);
    if(response.status === 'listening') {
      this.show();
    }
    else if(response.status === 'responding') {
      this.hide();
      this.setState({request:response.request});
      if(musicCommandRegex.test(response.request)) {
        let commands = response.request.split(musicCommandRegex);
        console.log(commands);
        let command = commands[1];
        let genre = commands[2];
        if(command === 'play') {
          if(genre !== "") {
	    this.state.musicPlayer.loadPlaylist({listType:'search',list:genre});
            this.state.musicPlayer.setShuffle(true);
          }
          if(this.state.musicPlayer) this.state.musicPlayer.playVideo();
        }      
        else if(command === 'stop') {
          if(this.state.musicPlayer) this.state.musicPlayer.stopVideo();
        }      
        else if(command === 'pause') {
          if(this.state.musicPlayer) this.state.musicPlayer.pauseVideo();
        }
        else if(command === 'resume') {
          if(this.state.musicPlayer) this.state.musicPlayer.playVideo();
        }
        else if(command === 'next') {
          if(this.state.musicPlayer) this.state.musicPlayer.nextVideo();
        }
        else if(command === 'previous') {
          if(this.state.musicPlayer) this.state.musicPlayer.previousVideo();
        }
      }
    }
  }

  onOpen = () => {
  }

  show = () => {
    this.setState({visible:true});
  }

  hide = () => {
    this.setState({visible:false});
  }

  youtubeOnReady = event => {
    console.log("Youtube ready");
    event.target.setVolume(70);
    //event.target.playVideo();
    this.setState({musicPlayer: event.target});
    console.log(event.target.getOptions('list'));
  }

            //<GifPlayer gif={ai_listening} autoplay={true} width={200}/>
  render() {
    console.log(this.state.opts);

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
            opts={this.state.opts}
            onReady={this.youtubeOnReady}   
          />
        </div>
        <div>{this.state.request}</div>
      </div>
    );
  }
}

export default App;
