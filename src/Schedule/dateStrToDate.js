
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

export default dateStrToDate;