import React, { Component } from 'react';
import Digits from './Digits/Digits';
import dateStrToDate from './dateStrToDate';
import './Timer.css';

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
    let nextEventDate = new Date();
    for(var i in nextDay){
      let newEvent = nextDay[i],
          newDate = dateStrToDate(newEvent.start.dateTime || newEvent.start.date);
      newDate.setFullYear(date.getFullYear());
      newDate.setMonth(date.getMonth());
      newDate.setDate(date.getDate());
      if(newDate > nextEventDate){
        nextEventDate = newDate;
        nextEvent = newEvent;
      }
    }
    const nextHour = nextEventDate.getHours(),
          nextMinute= nextEventDate.getMinutes(),
          nextSecond= nextEventDate.getSeconds();
    date.setHours(nextHour);
    date.setMinutes(nextMinute);
    date.setSeconds(nextSecond);
    return {date: date, nextEvent: nextEvent};
  }
  
  renderEvent(eventInfo){
    let summary, date, time, location, description;
    if(eventInfo){
      summary = eventInfo.nextEvent.summary;
      date = eventInfo.date.toLocaleDateString();
      time = eventInfo.date.toLocaleTimeString();
      location = eventInfo.nextEvent.location;
      description = eventInfo.nextEvent.description;
    }
    return (
      <div className="event">
        <div className="eventBox">
          <div className="eventSummary">
            <b>Event:</b> {summary}
          </div>
          <div className="eventDate">
            <b>Date:</b> {date}
          </div>
          <div className="eventTime">
            <b>Time:</b> {time}
          </div>
          <div className="eventLocation">
            <b>Location:</b> {location}
          </div>
        </div>
        <div className="eventBox">
          <b>Description:</b> {description}
        </div>
      </div>
    );
  }
  
  render() {
    let nextEventInfo = this.nextEventInfo(this.state.currentDate),
        totalSeconds, hours, minutes, seconds, event;
    if(nextEventInfo){
      totalSeconds = Math.floor((nextEventInfo.date - this.state.currentDate)/1000);
      hours = Math.floor(totalSeconds/3600);
      minutes = Math.floor(totalSeconds/60) % 60;
      seconds = totalSeconds % 60;
      event = nextEventInfo.nextEvent;
    }
    return (
      <div className="nextEvent">
        <div className="timerBox">
          <div className="timerLabel">
            <b>Time till next event</b>
          </div>
          <div className="timer">
            <Digits num={hours}/> 
            <span className="colon">&#58;</span>
            <Digits num={minutes}/>
            <span className="colon">&#58;</span>
            <Digits num={seconds}/>
          </div>
        </div>
        <div>{this.renderEvent(nextEventInfo)}</div>
      </div>
    );
  }
}

export default Timer;