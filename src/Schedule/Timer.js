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
    // this determines if calendarData is empty, dont ask me
    // why it needs to be so complicated
    if(Object.keys(this.props.calendarData).length===0){
      return null
    }
    
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
    if(count === 31){return "No Events This Month"}
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
  
  renderTimer(eventInfo){
    let timer=[];
    if(eventInfo){
      if(eventInfo==="No Events This Month"){
        timer.push(<p key="noUpcomingEvents">
          Looks like the next event is at least a month in the future.
          Try picking up another hobby.
        </p>);
      }else {
        let totalSeconds = Math.floor((eventInfo.date - this.state.currentDate)/1000),
        hours = Math.floor(totalSeconds/3600),
        minutes = Math.floor(totalSeconds/60) % 60,
        seconds = totalSeconds % 60;
        
        timer.push(<Digits num={hours}/>);
        timer.push(<span className="colon">&#58;</span>);
        timer.push(<Digits num={minutes}/>);
        timer.push(<span className="colon">&#58;</span>);
        timer.push(<Digits num={seconds}/>);
      }
    }
    return timer;
  }
  
  renderEvent(eventInfo){
    let summary, date, time, location, description,
    descriptionDiv = [], generalInfo = [];
    if(eventInfo){
      if(eventInfo==="No Events This Month"){
        time="to get a new hobby";
        description=
        "please just consider getting a new thing to do";
      }else{
        summary = eventInfo.nextEvent.summary;
        date = eventInfo.date.toLocaleDateString();
        time = eventInfo.date.toLocaleTimeString();
        location = eventInfo.nextEvent.location;
        description = eventInfo.nextEvent.description;
      }
    }
    if(summary){generalInfo.push(<div className="eventSummary"><b>Name:</b> {summary}</div>)};
    if(date){generalInfo.push(<div className="eventdate"><b>Date:</b> {date}</div>)};
    if(time){generalInfo.push(<div className="eventtime"><b>Time:</b> {time}</div>)};
    if(location){generalInfo.push(<div className="eventlocation"><b>Location:</b> {location}</div>)};
    if(description){descriptionDiv.push(<div className="eventBox"><b>Description:</b> {description}</div>)};    
    
    return (
      <div className="event">
        <div className="eventBox">
          {generalInfo}
        </div>
        {descriptionDiv}
      </div>
    );
  }
  
  render() {
    let nextEventInfo = this.nextEventInfo(this.state.currentDate);
    return (
      <div className="nextEvent">
        <div className="timerBox">
          <div className="timerLabel">
            <b>Time till next event</b>
          </div>
          <div className="timer">
            {this.renderTimer(nextEventInfo)}
          </div>
        </div>
        <div>{this.renderEvent(nextEventInfo)}</div>
      </div>
    );
  }
}

export default Timer;