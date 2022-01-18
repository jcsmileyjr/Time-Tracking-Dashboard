let currentTimeFrame = "weekly"
  
// When a timeframe's button is press, the style and data in the dashboards is update
const updateDashboards = (timeframe) => {
  highlightTimeFrame(timeframe); 
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
        // Use a regular expression to remove any empty space
        document.getElementById(`${(category.title).toLowerCase().replace(/ +/g, '')}-current`).innerHTML = `${category.timeslot["current"]}hrs`;
        document.getElementById(`${(category.title).toLowerCase().replace(/ +/g, '')}-previous`).innerHTML = `${newMessage} - ${category.timeslot["previous"]}hrs`;
        return; 
  });
  
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

// Allow the  user to click the timeframe buttons and update dashboard's data
const userClick = () => {
  const buttons = document.getElementsByClassName("time__button-style");
  Array.from(buttons).forEach(function (button){
    button.addEventListener('click', function() {
      console.log("it got click")
      updateDashboards((button.innerHTML).toLowerCase());
    })
  });

}

userClick();