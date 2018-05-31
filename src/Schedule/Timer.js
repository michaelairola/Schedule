import React, { Component } from 'react';
import Digits from './Digits/Digits';
import dateStrToDate from './dateStrToDate';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      currentDate: new Date()
    }
  }
  
  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      currentDate: new Date()
    });
  }
  
  nextEventInfo() {
    let date = new Date(), count = 0,
        nextDay = null, nextEvent = null;
    const data = this.props.calendarData;
    while (count < 31 && !nextDay){
      const year  = date.getFullYear(), 
            month = date.getMonth(),
            day   = date.getDate();
      if(data && data[year] 
              && data[year][month]
              && data[year][month][day]) {
        nextDay = data[year][month][day];
      }      
      date.setDate(day + 1);
      count ++;
    }
    if(count === 31){return null}
    else {
      date.setDate(date.getDate() - 1)
    }
    let nextEventDate = dateStrToDate(nextDay[0].start.dateTime || nextDay[0].start.date);
    for(var i in nextDay){
      let newEvent = nextDay[i],
          newDate = dateStrToDate(newEvent.start.dateTime || newEvent.start.date);
      if(newDate < nextEventDate){
        nextEventDate = newDate;
        nextEvent = newEvent;
      }
    }
    const nextHour = nextEventDate.getHours(),
          nextMinute= nextEventDate.getMinutes(),
          nextSecond= nextEventDate.getSeconds();
    date.setHours(nextHour);date.setMinutes(nextMinute);date.setSeconds(nextSecond);
    return {date: date, nextEvent: nextEvent};
  }
  
  render() {
    let nextEvent = this.nextEventInfo(this.state.currentDate),
        totalSeconds, hours, minutes, seconds;
    if(nextEvent){
      totalSeconds = Math.floor((nextEvent.date - this.state.currentDate)/1000);
      hours = Math.floor(totalSeconds/3600);
      minutes = Math.floor(totalSeconds/60) % 60 ;
      seconds = totalSeconds % 60;
    }
    return (
      <div className="timer-box">
        <span>Time till next event:</span>
        <div className="timer">
          <Digits num={seconds}/> 
          <span className="colon">&#58;</span>
          <Digits num={minutes}/>
          <span className="colon">&#58;</span>
          <Digits num={hours}/>
        </div>
      </div>
    );
  }
}

export default Timer;