import React from 'react';
import ReactDOM from 'react-dom';
import Schedule from './Schedule';
import createDataTree from './createDataTree';
import fetch from 'node-fetch';

it('create proper data Tree', () => {
  const url = 'https://www.googleapis.com/calendar/v3/calendars/j9li06635odqicqeifcuhq4tko@group.calendar.google.com/events?key=AIzaSyAhZKs9jI8I6Fy1vnhA0yQ0kD-_5_De6ww&maxResults=2500';
  fetch(url).catch(err => console.log('Error!!!' + err))
  .then(response => response.json())
  .then(json => createDataTree(json.items))
  .then(dataTree => {
    const event = dataTree['2018'][3][29];
    expect(event["summary"]).toBe("Daily Event for a Week");
  })
});
