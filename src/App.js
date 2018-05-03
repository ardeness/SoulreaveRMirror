import React, { Component } from 'react';
import GifPlayer from 'react-gif-player';
import Rodal from 'rodal';
import Websocket from 'react-websocket';
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
    this.state = { visible: false };
  }

  componentDidMount() {
  }

  messageHandler = (msg) => {
    console.log(msg);
  }
  show = () => {
    this.setState({visible:true});
  }

  hide = () => {
    this.setState({visible:false});
  }

  render() {
    return (
      <div>
        <Websocket url='ws://localhost:8765/' onMessage={this.messageHandler}/>
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
      </div>
    );
  }
}

export default App;
