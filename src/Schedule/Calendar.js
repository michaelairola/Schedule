import React, { Component } from 'react';
import dateStrToDate from './dateStrToDate';
import './Calendar.css';

class DayNames extends Component {
  render() {
    return (
      <tr className="week-names">
        <td className="day">Sun</td>
        <td className="day">Mon</td>
        <td className="day">Tue</td>
        <td className="day">Wed</td>
        <td className="day">Thu</td>
       	<td className="day">Fri</td>
       	<td className="day">Sat</td>
      </tr>
    );
  }
}

class Day extends Component {
  render() {
    let eventsList = [],
    isSelected = "date",
    notMonth = "",
    className = "",
    data = this.props.calendarData,
    selectedDay = this.props.selected.getDate(),
    selectedMonth = this.props.selected.getMonth(),
    selectedYear = this.props.selected.getFullYear(),
    year = this.props.year_month_day[0],
    month = this.props.year_month_day[1],
    day = this.props.year_month_day[2];

    // to determine if the day has an event or not
    if(data && data[year]
            && data[year][month]
            && data[year][month][day]) {
      const events = data[year][month][day];
      for (var i in events){
        const event = events[i],
              name = event.summary;
        let time;
        if(event.start.dateTime){
          time = dateStrToDate(event.start.dateTime).toLocaleTimeString().replace(/:00| /g,"");
        }
        eventsList.push(<li key={event.id}>
                        <span className="list">{time} {name}</span>
                      </li>
                      )
      }
    };

    // to determine if the day is selected
    if( day === selectedDay &&
      month === selectedMonth &&
       year === selectedYear) {
      isSelected = "selected"}
    // }else {isSelected = "date"};
    // to determine if the day is in the current month
    if(month!==this.props.currentMonth){
      notMonth = "notMonth"
    };
    className = notMonth +" "+ isSelected
    return (
      <td className="dateBox" onClick={this.props.onClick}>
        <div className={className}>
          <span className="date">{day}</span>
          <ul className="events">{eventsList}</ul>
        </div>
      </td>
    );
  }
}

class Week extends Component {
  render() {
    let count = 7,
      days = [];

    while(count > 0){
      const day = this.props.date.getDate(),
            month = this.props.date.getMonth(),
            year = this.props.date.getFullYear(),
            year_month_day = [year,month,day];

      days.push(<Day key={year_month_day}
                     year_month_day={year_month_day}
                     currentMonth={this.props.currentMonth}
                     selected={this.props.selected}
                     calendarData={this.props.calendarData}
                     onClick={() => this.props.onClick(year_month_day)}>
                </Day>);
      this.props.date.setDate(day + 1);
      count --;
    }
    return (
      <tr>{days}</tr>
    );
  }
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: this.props.selected.getFullYear(),
      currentMonth: this.props.selected.getMonth(),
    }

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  previous() {
    let year = this.state.currentYear,
       month = this.state.currentMonth;
    if(month === 0){year --; month = 11}
    else {month --}
    this.setState({currentYear: year, currentMonth: month});
  }

  next() {
    let year = this.state.currentYear,
        month = this.state.currentMonth;
    if(month === 11){year ++; month = 0}
    else {month ++}
    this.setState({currentYear: year, currentMonth: month});
  }

  render() {
    return (
      <div className="calendar">
        <div className="calendarLabel">
          <i className="previous" onClick={this.previous}>&larr;</i>
          {this.renderMonthLabel()}
          <i className="next" onClick={this.next}>&rarr;</i>
        </div>
        <table>
          <tbody>
            <DayNames />
            {this.renderWeeks()}
          </tbody>
        </table>
    </div>
    );
  }

  renderWeeks() {
    const year = this.state.currentYear,
          month = this.state.currentMonth;
    let weeks = [],
      firstDateOfMonth = new Date(year, month, 1),
      lastDayOfMonth = new Date(year, month+1, 0).getDate(),
      firstDayOfWeek = firstDateOfMonth.getDate() - firstDateOfMonth.getDay();

    while (firstDayOfWeek <= lastDayOfMonth) {
      weeks.push(
        <Week key={firstDayOfWeek}
              date={new Date(year, month, firstDayOfWeek)}
              currentMonth={this.state.currentMonth}
              calendarData={this.props.calendarData}
              onClick={(year, month, day) => this.props.changeSelected(year, month, day)}
              selected={this.props.selected}/>
            );
      firstDayOfWeek += 7;
    }
    return weeks;
  }

  renderMonthLabel() {
    const year = this.state.currentYear,
      monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"],
      month = monthNames[this.state.currentMonth];
    return (
       <span className="month">{month} {year}</span>
     );
  }
}

export default Calendar;
