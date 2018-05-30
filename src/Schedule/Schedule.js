import React, { Component } from 'react';
import Timer from './Timer';
import Calendar from './Calendar';
import createDataTree from './createDataTree';

class Schedule extends Component {
  constructor(props){
    super(props);
    this.state = {
      newCalendarData: {}
    }
  }
    
  render() {
    const dataTree = createDataTree(this.props.calendarData),
          day = this.props.date.getDate(),
          month = this.props.date.getMonth(),
          year = this.props.date.getFullYear();
    return(
      <div>
        <Timer time={this.props.date}
                calendarData={dataTree}/>
        <Calendar selected={new Date(year, month, day)}
                  calendarData={dataTree}/>
      </div>
    );
  }
}

export default Schedule;