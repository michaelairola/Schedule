import React, { Component } from 'react';
import Schedule from './Schedule/Schedule';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      // options for calendarId for testing are:
      // testCalendar, publicTestCalendar, chsVolleyballCalendar
      calendarId: this.props.testCalendar,
      calendarData: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
   this.setState({calendarId: event.target.value});
 }
  
  handleSubmit(event) {
    this.fetchCalendar(this.state.calendarId);
    event.preventDefault();
  }
  
  createURL(id) {
    const preURL = "https://www.googleapis.com/calendar/v3/calendars/",
          postURL = "/events?key=AIzaSyAhZKs9jI8I6Fy1vnhA0yQ0kD-_5_De6ww&maxResults=2500";
    return preURL + id + postURL;
  }
  
  fetchCalendar(id){
    const url = this.createURL(id);
    fetch(url)
    .then(response => response.json())
    .then(json => 
      this.setState({calendarData: json.items})
    ).catch(err => {
      console.log(err);
    });
  }
  
  componentDidMount() {
    this.fetchCalendar(this.state.calendarId);
  }
  
  render() {
    return (
      <div className="App">
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="calendarId">
            Calendar Id:
            <input type="text"
                   className="idInput"
                   value={this.state.calendarId} 
                   onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Schedule calendarData={this.state.calendarData}
                  date={new Date()}/>
      </div>
    );
  }
}

export default App;
