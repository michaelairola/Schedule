import React, { Component } from 'react';
import './Digits.css';
// this code prints out a digit created with segmented CSS
// pretty neat stuff here!
class Segment extends Component {
  render() {
    const seg = this.props.seg
    if (seg === "g") {
      return (
        <div className="g">
          <div className="top" />
          <div className="bottom" />
        </div>
      );
    }
    else {
    return (
      <div className={seg} />
    );
    }
  }
}

class Digit extends Component {
  //  mapping of the segments to the respected
  //      value from the Digits.css file
  //          a
  //      --------
  //     |         |
  //   f |         | b
  //     |    g    |
  //      ---------
  //     |         |
  //   e |         | c
  //     |    d    |
  //      ---------

  constructor() {
    super();
    this.state = {
      num_to_seg:
      ["abcdef", "bc", "abged", "abgcd", "fgbc",
       "afgcd", "afgcde", "abc", "abcdefg", "abcdgf"],
    };
  }

  render() {
    const segs = Array.from(this.state.num_to_seg[this.props.val])

    return(
      <div className="digit">
        {
          segs.map((seg) => <Segment key={seg} seg={seg} />)
        }
      </div>
    );
  }
}


class Digits extends Component {

  digits(num) {
    if(!num){return ['0', '0']}
    var output = [],
    sNumber = num.toString();
    output.push(+sNumber.charAt(sNumber.length-1));
    if(sNumber.length <= 1){
      output.push('0');
    }else {
      for (var i = sNumber.length - 2; i >= 0; i--) {
        output.push(+sNumber.charAt(i));
      }
    }
    return output;
  }

  render() {
    const val = this.props.num;
    const digits = this.digits(val);
    return (
      <div className="number-box">
        {
          digits.map((digit, ind) => <Digit key={ind} val={digit} />)
        }
      </div>
    );
  }
}

export default Digits;
