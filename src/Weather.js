import React, { Component } from 'react';
import 'weathericons/css/weather-icons.min.css';

const weatherCode = {
  200: "wi-storm-showers",
  201: "wi-thunderstorm",
  202: "wi-thunderstorm",
  210: "wi-lightning",
  211: "wi-lightning",
  212: "wi-lightning",
  221: "wi-lightning",
  230: "wi-storm-showers",
  231: "wi-storm-showers",
  232: "wi-storm-showers",

  300: "wi-sleet",
  301: "wi-sleet",
  302: "wi-sleet",
  310: "wi-sleet",
  311: "wi-sleet",
  312: "wi-sleet",
  313: "wi-sleet",
  314: "wi-sleet",
  321: "wi-sleet",

  500: "wi-rain",
  501: "wi-rain",
  502: "wi-rain",
  503: "wi-rain",
  504: "wi-hail",
  511: "wi-hail",
  520: "wi-hail",
  521: "wi-showers",
  522: "wi-showers",
  531: "wi-showers",
  600: "wi-snow",
  601: "wi-snow",
  602: "wi-snow",
  611: "wi-sleet",
  612: "wi-sleet",
  615: "wi-snow",
  616: "wi-snow",
  620: "wi-snow",
  621: "wi-snow",
  622: "wi-snow",

  701: "wi-fog",
  711: "wi-smoke",
  721: "wi-day-haze",
  731: "wi-dust",
  741: "wi-fog",
  751: "wi-sandstorm",
  761: "wi-dust",
  762: "wi-volcano",
  771: "wi-strong-wind",
  781: "wi-tornado",
  800: "wi-day-sunny",
  801: "wi-day-cloudy",
  802: "wi-cloudy",
  803: "wi-cloudy",
  804: "wi-cloudy"
}

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayIcon: '',
      temp : 0,
      tempMin : 0,
      tempMax : 0,
      humidity: 0,
      wind: 0,
    };
  }

  componentDidMount() {
    this.getWeatherInfo();
    setInterval(this.getWeatherInfo, 60000);
  }

  getWeatherInfo = () => {
      const APIKEY='35742fb2954ff689d62f0e8b0b929dc0';
      const lat='37.362';
      const lon='126.933';
      const url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID='+APIKEY;
      //const url='/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID='+APIKEY;

      fetch(url)
      .then(response => response.json())
      .then(weather => this.parseWeatherInfo(weather))
      .catch(error => console.log(error));
  }

  parseWeatherInfo = (weather) => {
    let todayIcon = "wi " + weatherCode[weather.weather[0].id];
    let temp = parseInt(weather.main.temp - 273.15, 10);
    let tempMin = parseInt(weather.main.temp_min - 273.15, 10);
    let tempMax = parseInt(weather.main.temp_max - 273.15, 10);
    let humidity = weather.main.humidity;
    let wind = weather.wind.speed;


    this.setState({
      todayIcon,
      temp,
      tempMin,
      tempMax,
      humidity,
      wind
    });
  }

  render() {
    return (
      <div style={{paddingTop: '1em'}}>
        <div style={{float:'left'}}>
          <div
            className={this.state.todayIcon}
            style={{
              fontSize:'70px',
              paddingTop:'0.1em',
              paddingLeft:'.3em',
              paddingRight:'.3em',
              paddingBottom:'.3em',
            }}
          />
        </div>
        <div style={{float:'left'}}>
          <div style={{float: 'left'}}>
            <div
              className="wi wi-humidity"
              style={{
                float:'left',
                fontSize:'20px',
                paddingTop:'0.3em',
                paddingLeft:'.3em',
                paddingRight:'.3em',
                paddingBottom:'.3em',
              }}
            />
            <div
              style={{
                float:'left',
                fontSize:'20px',
                paddingTop:'0.16em',
                paddingLeft:'.3em',
                paddingRight:'.3em',
                paddingBottom:'.3em',
              }}
            >
              {this.state.humidity}
            </div>
            <div
              className="wi wi-degrees"
              style={{
                float:'left',
                fontSize:'20px',
                paddingTop:'0.3em',
                paddingRight:'.3em',
                paddingBottom:'.3em',
              }}
            />
          </div>
          <div style={{clear:'left'}}/>
          <div style={{float: 'left'}}>
            <div
              className="wi wi-thermometer"
              style={{
                float:'left',
                fontSize:'20px',
                paddingTop:'0.3em',
                paddingLeft:'.4em',
                paddingRight:'.3em',
                paddingBottom:'.3em',
              }}
            />
            <div
              style={{
                float:'left',
                fontSize:'10px',
                paddingTop:'0.9em',
                paddingLeft:'.3em',
                paddingBottom:'.3em',
              }}
            >
              {this.state.tempMin} -
            </div>
            <div
              style={{
                float:'left',
                fontSize:'20px',
                paddingTop:'0.16em',
                paddingBottom:'.3em',
              }}
            >
              {this.state.temp}
            </div>
            <div
              style={{
                float:'left',
                fontSize:'10px',
                paddingTop:'.9em',
                paddingLeft:'.3em',
                paddingRight:'.3em',
                paddingBottom:'.3em',
              }}
            >
              - {this.state.tempMax}
            </div>
            <div
              className="wi wi-celsius"
              style={{
                float:'left',
                fontSize:'20px',
                paddingTop:'0.3em',
                paddingRight:'.3em',
                paddingBottom:'.3em',
              }}
            />
            <div style={{clear:'left'}}/>
          </div>
          <div style={{clear:'left'}}/>
          <div style={{float: 'left'}}>
            <div
              className="wi wi-strong-wind"
              style={{
                float:'left',
                fontSize:'20px',
                paddingTop:'0.3em',
                paddingLeft:'.1em',
                paddingRight:'.3em',
                paddingBottom:'.3em',
              }}
            />
            <div
              style={{
                float:'left',
                fontSize:'20px',
                paddingTop:'0.16em',
                paddingLeft:'.3em',
                paddingRight:'.3em',
                paddingBottom:'.3em',
              }}
            >
              {this.state.wind} m/s
            </div>
            <div style={{clear:'left'}}/>
          </div>
          <div style={{clear:'left'}}/>
        </div>
        <div style={{clear:'left'}}/>
      </div>
    );
  }
}

export default Weather;
