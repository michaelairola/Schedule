import React, { Component } from 'react';
import Timer from './Timer';
import Calendar from './Calendar';
import SelectedDay from './SelectedDay';
import createDataTree from './createDataTree';
import './Schedule.css';

class Schedule extends Component {
  constructor(){
    super();
    this.state={
      selected: new Date()
    }
  }
  
  render() {
    const dataTree = createDataTree(this.props.calendarData);
    return(
      <div className="schedule">
        <Timer calendarData={dataTree}/>
        <div className="calendarBox">
          <Calendar selected={this.state.selected}
                    calendarData={dataTree}/>
          <SelectedDay selected={this.state.selected}/>
        </div>
      </div>
    );
  }
}

export default Schedule;