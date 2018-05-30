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
          let rruleStr = event.recurrence[j];
          if(rruleStr.includes("RULE")){
            let dtstart = dateStrToDate(event.start.dateTime || event.start.date),
                rrule = rrulestr(rruleStr, {dtstart: dtstart});
            if(rruleStr.startsWith("RRULE")){
              rruleDict[id].rrule(rrule);
            }else if (rruleStr.startsWith("EXRULE")){
              rruleDict[id].exrule(rrule);
            }
          } else if(rruleStr.includes("DATE")){
            let date = dateStrToDate(rruleStr);
            if(rruleStr.startsWith("RDATE")){
              rruleDict[id].rdate(date);
            }else if(rruleStr.startsWith("EXDATE")){
              rruleDict[id].exdate(date);
            }
          } else {console.log("createRRuleDict error")}
        }
      } else if(event.recurringEventId){
        const ogDate = dateStrToDate(event.originalStartTime.dateTime || event.originalStartTime.date);        
        rruleDict[id].exdate(ogDate);
      }else {
        const date = dateStrToDate(event.start.dateTime || event.start.date);
        rruleDict[id].rdate(date);
      }
    }
    return rruleDict;
  }
  
  const dateStrToDate = (dateStr) => {
    if(dateStr){
      let date = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/) 
              || dateStr.match(/(\d{4})(\d{2})(\d{2})T/),
          time = dateStr.match(/(\d{2}):(\d{2}):(\d{2})/) 
              || dateStr.match(/T(\d{2})(\d{2})(\d{2})/);
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
    let dates;
    for(var i in data){
      dates = [];
      const event = data[i];
      if(!event.recurringEventId){
        let firstDate = new Date(), lastDate = new Date();
        firstDate.setYear(firstDate.getFullYear() - 10);
        lastDate.setYear(lastDate.getFullYear() + 10);
        dates = rruleDict[event.id].between(firstDate, lastDate);
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