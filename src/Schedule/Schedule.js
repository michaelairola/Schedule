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
    
    this.changeSelected = this.changeSelected.bind(this);
  }
    
  changeSelected([year, month, day]) {
    this.setState({selected: new Date(year, month, day)});
  }
  
  render() {
    const dataTree = createDataTree(this.props.calendarData);
    return(
      <div className="schedule">
        <Timer calendarData={dataTree}/>
        <div className="calendarBox">
          <Calendar selected={this.state.selected}
                    calendarData={dataTree}
                    changeSelected={([year,month,day]) => this.changeSelected([year,month,day])}/>
          <SelectedDay selected={this.state.selected}
                       calendarData={dataTree}/>
        </div>
      </div>
    );
  }
}

export default Schedule;