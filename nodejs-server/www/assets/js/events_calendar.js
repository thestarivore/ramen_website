const bodyContainer = document.getElementById('ecalendar_table_body');
const headContainer = document.getElementById('ecalendar_table_head');

var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

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

var eventIds = [];
var eventNames = [];
var eventDates = [];
  
buildCalendar();

function buildCalendar(selectedMonth, selectedYear){
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
            let {id, name, date} = json[i];
            eventIds[i] = id;
            eventNames[i] = name;
            eventDates[i] = new Date(Date.parse(date));
        }

        //If no month selected
        if(selectedMonth == null){
          today = new Date();
          month = today.getMonth();
          year = today.getFullYear();
          //firstDay = today.getDay();
        } else {
          today = new Date();
          month = selectedMonth;
          year = selectedYear;
        }

        //Set the Month on the Head
        const content = `
          <div>
            <button id="left_month_btn" type="button" class="btn btn-default">
              <span class="arrow left"></span>
            </button>
          </div>

          <div>
            <h2>${monthArray[month]}</h2>
          </div>

          <div>
            <button id="right_month_btn" type="button" class="btn btn-default">
              <span class="arrow right"></span>
            </button>
          </div>
        `;

        // Append newyly created card element to the container
        headContainer.innerHTML += content;

        //Set OnClick Actions for the Buttons
        //Empty the Calendar content and build it again for the selected month
        $('#left_month_btn').on('click', function(event) {
          headContainer.innerHTML = "";
          bodyContainer.innerHTML = "";
          if(month > 0)
            buildCalendar(month-1, year);
          else
            buildCalendar(11, year - 1);
        });
        $('#right_month_btn').on('click', function(event) {
          headContainer.innerHTML = "";
          bodyContainer.innerHTML = "";
          if(month < 11)
            buildCalendar(month+1, year);
          else
            buildCalendar(0, year + 1);
        });

        //Calculate starting date (the week that contains today)
        //var startingDate = Math.floor(today.getDate()/7) * 7 + 1;
        var startingDay = new Date();
        //startingDay.setDate(startingDate);
        startingDay.setDate(1);
        startingDay.setMonth(month);
        startingDay.setFullYear(year);
        firstDay = startingDay.getDay();  

        numDays = daysInMonth(month, year);
        day = firstDay;

        //Cycle one Week day by day
        var i=1;
        while(i <= numDays){
          var eventName = "";
          //date = today.getDate()+i;
          //date = startingDay.getDate()+i;
          date = i;
          //day = firstDay+i;
          if(day>6)
            day-=7;

          //Find is there any event on this date
          for (var j = 0; j < eventNames.length; j++) {
            if(isEventOnDate(j, date, month, year)){
              var event = `<a href="event.html?event_id=${eventIds[j]}">` + eventNames[j] + `</a>`

              if(eventName != "")
                eventName += "<br>" + event;
              else
                eventName = event;
              //break;//max one event per day
            }
          }

          //Set the date as Bold if is the current day
          if(date == today.getDate() && selectedMonth == null)
            dateHTML = `<p class="font-weight-bold">${date}</p>`;
          else
            dateHTML = `<p>${date}</p>`;

          // Construct card content
          const content = `
            <tr class="d-row">
              <td class="col-md-1 bordered_column"><p>${weekday[day]}</p></td>
              <td col-md-1>${dateHTML}</td>
              <td col-md-10><p>${eventName}</p></td>
            </tr>
          `;

          // Append newyly created card element to the container
          bodyContainer.innerHTML += content;

          if(isAnyEventOnDate(date, month, year) || isAnyEventOnDate(date+1, month, year) || date == numDays){
            day++;
            i++;
          } else {
            // Construct card content
            const content = `
              <tr class="d-row">
                <td class="col-md-1 bordered_column discussion"></td>
                <td class="col-md-1 discussion"></td>
                <td class="col-md-10"></td>
              </tr>
            `;

            // Append newyly created card element to the container
            bodyContainer.innerHTML += content;

            // Find the first date that has an Event
            eventDate = getFirstDateWithEvent(date, month, year);
            
            // Get the new day of the week
            var tmpDate = new Date();
            tmpDate.setDate(eventDate);
            tmpDate.setMonth(month);
            tmpDate.setFullYear(year);
            day = tmpDate.getDay(); 
            
            // Set the new day
            i = eventDate;
          }
        }

       
    });
}

// check how many days in a month 
function daysInMonth(iMonth, iYear) { 
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

// check id there is an event on the specified date
function isEventOnDate(i, date, month, year) { 
  if(eventDates[i].getDate() == date && eventDates[i].getMonth() == month && eventDates[i].getFullYear() == year)
    return true;
  else
    return false;
}

// check id there is any event on the specified date
function isAnyEventOnDate(date, month, year) { 
  //Find is there any event on this date
  for (var j = 0; j < eventNames.length; j++) {
    if(isEventOnDate(j, date, month, year)){
      return true;
    }
  }

  return false;
}

// Starting from the specified date, find the first date that has an Event
function getFirstDateWithEvent(date, month, year){
  for (var j = date; j < daysInMonth(month, year); j++) {
    if(isAnyEventOnDate(j, month, year))
      return j; 
  }

  return daysInMonth(month, year);
}