let currentTimeFrame = "weekly"
  
const updateDashboards = (timeframe) => {
  // Update the format button's styling
  highlightTimeFrame(timeframe); 

  // Update the data in the UI
  updateData(timeframe);      
}

const updateData = (timeframe) => {
  fetch('./data.json')
  .then(response => response.json())
  .then(data => {distillData(data, timeframe)});
}

//Within each object, I just want the title and timeframes's property that matches
const distillData = (data, timeframe) => {
  let newDashboardDataPoint = {};
  let newDashboardArray = [];
  data.forEach(dataStream => {
    newDashboardDataPoint.title = dataStream.title;
    newDashboardDataPoint.timeslot = dataStream.timeframes[timeframe];
    newDashboardArray.push(newDashboardDataPoint);
    newDashboardDataPoint = {};
  });
  
  updatePage(newDashboardArray, timeframe);    
}

// function that update each dashboards two different time data points with format "data hrs"
const updatePage = (data, timeframe) => {
  let newMessage = "";
  if(timeframe === 'daily'){
    newMessage = 'Yesterday';
  }else if(timeframe === 'weekly'){
    newMessage = 'Last Week';
  }else {
    newMessage = "Last Month";
  }
  
  data.forEach((category)=> {
    if(category.title === 'Work'){
      document.getElementById('work-current').innerHTML = `${category.timeslot["current"]}hrs`;
      document.getElementById('work-previous').innerHTML = `${newMessage} - ${category.timeslot["previous"]}hrs`;
      return;
    }
    if(category.title === 'Play'){
      document.getElementById('play-current').innerHTML = `${category.timeslot["current"]}hrs`;
      document.getElementById('play-previous').innerHTML = `${newMessage} - ${category.timeslot["previous"]}hrs`;
      return;
    }
    if(category.title === 'Study'){
      document.getElementById('study-current').innerHTML = `${category.timeslot["current"]}hrs`;
      document.getElementById('study-previous').innerHTML = `${newMessage} - ${category.timeslot["previous"]}hrs`;
      return;
    }
    if(category.title === 'Exercise'){
      document.getElementById('exercise-current').innerHTML = `${category.timeslot["current"]}hrs`;
      document.getElementById('exercise-previous').innerHTML = `${newMessage} - ${category.timeslot["previous"]}hrs`;
      return;
    }
    if(category.title === 'Social'){
      document.getElementById('social-current').innerHTML = `${category.timeslot["current"]}hrs`;
      document.getElementById('social-previous').innerHTML = `${newMessage} - ${category.timeslot["previous"]}hrs`;
      return;
    }
    if(category.title === 'Self Care'){
      document.getElementById('selfcare-current').innerHTML = `${category.timeslot["current"]}hrs`;
      document.getElementById('selfcare-previous').innerHTML = `${newMessage} - ${category.timeslot["previous"]}hrs`;
      return;
    }
  })
  
}

// function that highlight the current time frame button
const highlightTimeFrame = (timeframe) => {
  const timeframes = document.getElementsByClassName("time__button-style");
  Array.from(timeframes).forEach(function (format){
    if((format.innerHTML).toLowerCase() === timeframe){
      format.classList.add("time--highlight");
    }else {
      format.classList.remove("time--highlight");
    }
  });
}