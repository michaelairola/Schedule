import React, {Component} from 'react';
import dateStrToDate from './dateStrToDate';
import './SelectedDay.css';

class SelectedDay extends Component {
  render() {
    const data = this.props.calendarData,
          year = this.props.selected.getFullYear(),
          month= this.props.selected.getMonth(),
          day  = this.props.selected.getDate();
    let events, eventsList=[];
    if(data[year]
    && data[year][month]
    && data[year][month][day]){
      events = data[year][month][day];
    }

    for(var i in events){
      let eventInfo = [], time;
      const event = events[i];
      if(event.start.dateTime){
        time = dateStrToDate(event.start.dateTime).toLocaleTimeString();
      }
      if(event.summary){eventInfo.push(<div key="summary" className="summary"><b>Event: </b>{event.summary}</div>)}
      if(time){eventInfo.push(<div key="time" className="time"><b>Time: </b>{time}</div>)}
      if(event.location){eventInfo.push(<div key="location" className="location"><b>Location: </b>{event.location}</div>)}
      if(event.description){eventInfo.push(<div key="description" className="description"><b>Description: </b>{event.description}</div>)}

      eventsList.push(eventInfo);
    }
    if(Object.keys(data).length!==0&&eventsList.length===0){
      eventsList = [
        <div key="noEvents" className="selectedDayNoEvents"> No Events this day </div>
      ]
    }
    return(
      <div className="selectedDay">
        <div className="selectedDayDate">Events on {this.props.selected.toLocaleDateString()}</div>
        <div className="selectedDayEvents">
          {eventsList.map((x,i)=>(
            <div key={i} className="event">{x}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default SelectedDay;
