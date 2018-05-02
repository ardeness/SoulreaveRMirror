import React, { Component } from 'react';
import DigitDotDisplay from './DigitDotDisplay';
import CharDotDisplay from './CharDotDisplay';

const day = [
  'sun','mon','tue','wed','thu','fri','sat'
];

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
  componentDidMount() {
    setInterval(this.updateTime, 60000);
  }

  updateTime = () => {
    let date = new Date();
    this.setState({date});
  }

  parseDate = (time) => {
    let date = time.getDate();
    let day = time.getDay();
    let year = time.getFullYear();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let month = time.getMonth();
    let second = time.getSeconds();

    return {
      date, day, year, hour, minute, month, second
    };
  }
  render() {
    let dateStyle = {
      width: '3px',
      height:'3px',
      margin:'1px'
    };
    let date = this.parseDate(this.state.date);
    return (
      <div>
        <div>
          <div style={{float:'left'}}>
            <DigitDotDisplay {...dateStyle} digit={parseInt(date.year/1000, 10)}/>
          </div>
          <div style={{float:'left'}}>
            <DigitDotDisplay {...dateStyle} digit={parseInt(date.year/100, 10)%10}/>
          </div>
          <div style={{float:'left'}}>
            <DigitDotDisplay {...dateStyle} digit={parseInt(date.year/10, 10)%10}/>
          </div>
          <div style={{float:'left'}}>
            <DigitDotDisplay {...dateStyle} digit={date.year%10}/>
          </div>
          <div style={{float:'left'}}>
            <CharDotDisplay {...dateStyle} char='.'/>
          </div>
          <div style={{float:'left'}}>
            <DigitDotDisplay {...dateStyle} digit={parseInt(date.month/10, 10)}/>
          </div>
          <div style={{float:'left'}}>
            <DigitDotDisplay {...dateStyle} digit={date.month%10+1}/>
          </div>
          <div style={{float:'left'}}>
            <CharDotDisplay {...dateStyle} char='.'/>
          </div>
          <div style={{float:'left'}}>
            <DigitDotDisplay {...dateStyle} digit={parseInt(date.date/10, 10)}/>
          </div>
          <div style={{float:'left'}}>
            <DigitDotDisplay {...dateStyle} digit={date.date%10}/>
          </div>
          <div style={{float:'left'}}>
            <CharDotDisplay {...dateStyle} char=' '/>
          </div>
          <div style={{float:'left'}}>
            <CharDotDisplay {...dateStyle} char={day[date.day][0]}/>
          </div>
          <div style={{float:'left'}}>
            <CharDotDisplay {...dateStyle} char={day[date.day][1]}/>
          </div>
          <div style={{float:'left'}}>
            <CharDotDisplay {...dateStyle} char={day[date.day][2]}/>
          </div>
        </div>

        <div style={{clear:'left'}}/>

        <div style={{paddingTop:'.5em'}}>
          <div style={{float:'left'}}>
            <DigitDotDisplay digit={parseInt(date.hour/10, 10)}/>
          </div>
          <div style={{float:'left'}}>
            <DigitDotDisplay digit={date.hour%10}/>
          </div>

          <div style={{float:'left'}}>
            <CharDotDisplay char=':'/>
          </div>

          <div style={{float:'left'}}>
            <DigitDotDisplay digit={parseInt(date.minute/10, 10)}/>
          </div>
          <div style={{float:'left'}}>
            <DigitDotDisplay digit={date.minute%10}/>
          </div>

          <div style={{clear:'left'}}/>
        </div>
      </div>
    );
  }
}

export default Clock;
