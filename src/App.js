import React, { Component } from 'react';
import Schedule from './Schedule/Schedule';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      preUrl: "https://www.googleapis.com/calendar/v3/calendars/",
      postUrl: "/events?key=AIzaSyAhZKs9jI8I6Fy1vnhA0yQ0kD-_5_De6ww&maxResults=2500",
      calendarId: 'j9li06635odqicqeifcuhq4tko@group.calendar.google.com',
      calendarData: {}
    }
  }
  
  componentDidMount(){
    const url = this.state.preUrl + this.state.calendarId + this.state.postUrl;
    fetch(url)
    .then(response => response.json())
    .then(json => 
      this.setState({calendarData: json.items})
    ).catch(err => console.log('Error!!!' + err));
  }
  
  render() {
    return (
      <div className="App">
        <Schedule calendarData={this.state.calendarData}
                  date={new Date()}/>
      </div>
    );
  }
}

export default App;
