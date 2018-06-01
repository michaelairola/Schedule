import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App
  testCalendar='j9li06635odqicqeifcuhq4tko@group.calendar.google.com'
  publicTestCalendar='rkum1mpf9km93b6io7dgniramg@group.calendar.google.com'
  chsVolleyballCalendar='tfd0nd7cddaj0l3k7k9qcrl81o@group.calendar.google.com'/>,
  document.getElementById('root'));
registerServiceWorker();
