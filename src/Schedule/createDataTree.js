import { RRuleSet, rrulestr } from 'rrule';

const createDataTree = (data) => {
  
  const createRRuleDict = (data) => {
    let rruleDict = {};
    for(var i in data){
      const event = data[i];
      const id = event.recurringEventId || event.id;
      if(!rruleDict[id]){rruleDict[id] = new RRuleSet()};
      if(event.recurrence){
        for(var j in event.recurrence){
          let rrule = event.recurrence[j];
          if(rrule.startsWith("RRULE")){
            if(!rrule.includes("DTSTART")){
              let dtstart = dateStrToDate(event.start.dateTime || event.start.date);
              rrule = rrulestr(rrule, {dtstart: dtstart});
            } else {
              rrule = rrulestr(rrule);
            }
            rruleDict[id].rrule(rrule);
          } else if(rrule.startsWith("EXRULE")){
            rrule = rrulestr(rrule);
            rruleDict[id].rdate(rrule);
          } else if(rrule.startsWith("RDATE")){
            let date = dateStrToDate(rrule);
            rruleDict[id].rdate(date);
          } else if(rrule.startsWith("EXDATE")){
            let date = dateStrToDate(rrule);
            rruleDict[id].exdate(date);
          }else {
            console.log("createRRuleDict error");
          }
        }
      } else if(event.recurringEventId){
        const ogDate = dateStrToDate(event.originalStartTime.dateTime || event.originalStartTime.date);
        rruleDict[id].exdate(ogDate);
      }else {
        rruleDict[id] = new RRuleSet();
        const date = dateStrToDate(event.start.dateTime || event.start.date);
        rruleDict[id].rdate(date);
      }
    }
    return rruleDict;
  }
  
  const dateStrToDate = (start) => {
    if(start){
      let date = start.match(/(\d{4})-(\d{2})-(\d{2})/),
          time = start.match(/(\d{2}):(\d{2}):(\d{2})/);
          
      const year = date[1], month = date[2]-1, day = date[3];
      let hour = 0, minutes = 0, seconds = 0;
      if(time){
        hour = time[1];
        minutes = time[2];
        seconds = time[3];
      }
      return new Date(year, month, day, hour, minutes, seconds);
    }
  }
  
  var addDatesToData = (event, data, dates) => {
    for(var i in dates){
      const date = dates[i];
      if(date){
        const year = date.getFullYear(),
          month = date.getMonth(),
          day = date.getDate();
        if(!data[year]){data[year] = []};
        if(!data[year][month]){data[year][month] = []};
        if(!data[year][month][day]){data[year][month][day] = [event]}
        else{data[year][month][day].push(event)}
      }
    }
  }
  
  const renderData = (data) => {
    let newData = {};
    const rruleDict = createRRuleDict(data);
    let dates = [];
    for(var i in data){
      const event = data[i];
      if(!event.recurringEventId){
        dates = rruleDict[event.id].all();
      }
      else if(event.status !== 'cancelled'){
        dates = [ dateStrToDate(event.start.dateTime || event.start.date) ];
      }
      addDatesToData(event, newData, dates);
    }
    return newData;
  }
  
  return renderData(data);
}

export default createDataTree;