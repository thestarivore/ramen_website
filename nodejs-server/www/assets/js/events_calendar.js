const bodyContainer = document.getElementById('ecalendar_table_body');
const headContainer = document.getElementById('ecalendar_table_head');

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var monthArray = new Array(12);
monthArray[0] = "January";
monthArray[1] = "February";
monthArray[2] = "March";
monthArray[3] = "April";
monthArray[4] = "May";
monthArray[5] = "June";
monthArray[6] = "July";
monthArray[7] = "August";
monthArray[8] = "September";
monthArray[9] = "October";
monthArray[10] = "November";
monthArray[11] = "December";

var eventNames = [];
var eventDates = [];
  
fetch("v2/events")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then(function(json) {
        for (var i = 0; i < json.length; i++) {
            //var listItem = document.createElement("li");
            let {name, date} = json[i];
            eventNames[i] = name;
            eventDates[i] = new Date(Date.parse(date));
        }

        today = new Date();
        month = today.getMonth();
        year = today.getFullYear();
        firstDay = today.getDay();

        //Set the Month on the Head
        const content = `
          <tr>
            <th>${monthArray[month]}</th>
          </tr>
        `;
        // Append newyly created card element to the container
        headContainer.innerHTML += content;

        //Cycle one Week day by day
        for(i=0; i <= 6; i++){
          var eventName = "";
          date = today.getDate()+i;
          day=firstDay+i;
          if(day>6)
            day-=6;

          //Find is there any event on this date
          for (var j = 0; j < eventNames.length; j++) {
            if(eventDates[j].getDate() == date){
              eventName = eventNames[j];
              break;//max one event per day
            }
          }

          // Construct card content
          const content = `
            <tr>
              <td>${weekday[day]}</td>
              <td>${date}</td>
              <td>${eventName}</td>
            </tr>
          `;

          // Append newyly created card element to the container
          bodyContainer.innerHTML += content;
        }

       
    });


// check how many days in a month 
function daysInMonth(iMonth, iYear) { 
  return 32 - new Date(iYear, iMonth, 32).getDate();
}