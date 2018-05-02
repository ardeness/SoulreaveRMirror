import React, { Component } from 'react';
import PropTypes from 'prop-types';

const numberMap = [
  [
    [ 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ]
  ],
  [
    [ 0, 0, 0, 1, 0 ],
    [ 0, 0, 1, 1, 0 ],
    [ 0, 0, 0, 1, 0 ],
    [ 0, 0, 0, 1, 0 ],
    [ 0, 0, 0, 1, 0 ],
    [ 0, 0, 0, 1, 0 ],
    [ 0, 0, 1, 1, 1 ]
  ],
  [
    [ 1, 1, 1, 1, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 0, 0 ],
    [ 1, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1 ]
  ],
  [
    [ 1, 1, 1, 1, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 1, 1, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ]
  ],
  [
    [ 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ]
  ],
  [
    [ 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 0, 0 ],
    [ 1, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ]
  ],
  [
    [ 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 0, 0 ],
    [ 1, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ]
  ],
  [
    [ 1, 1, 1, 1, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ]
  ],
  [
    [ 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ]
  ],
  [
    [ 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ]
  ],
  [
    [ 0 ],
    [ 0 ],
    [ 1 ],
    [ 0 ],
    [ 1 ],
    [ 0 ],
    [ 0 ]
  ],
];

class DigitDotDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }
  componentDidMount() {
    this.setState({...this.props});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  genDot = (onColor, offColor, status, index) => {
    let backgroundColor = status ? onColor: offColor;
    return (<div key={index} style={{backgroundColor, margin: this.props.margin, width:this.props.width, height:this.props.height, float:'left'}}/>);
  }

  render() {
    let digit = numberMap[this.state.digit];
    let dotGraph = digit.map( (line, index) => {
      return (
        <div key={index} style={{clear:'left', margin:'5px'}}>
          {line.map( (dot, index) => this.genDot('white','black', dot, index) )}
        </div>
      );
    });

    return (
      <div>
        {dotGraph}
      </div>
    );
  }
}

DigitDotDisplay.propTypes = {
  digit       : PropTypes.number.isRequired,
  width       : PropTypes.string.isRequired,
  height      : PropTypes.string.isRequired,
  margin      : PropTypes.string.isRequired,
  cellMargin  : PropTypes.string.isRequired,
};

DigitDotDisplay.defaultProps = {
  digit       : 0,
  width       : '10px',
  height      : '10px',
  margin      : '1px',
  cellMargin  : '5px',
}

export default DigitDotDisplay;
