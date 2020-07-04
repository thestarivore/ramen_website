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
monthArray[0] = "Jan";
monthArray[1] = "Feb";
monthArray[2] = "Mar";
monthArray[3] = "Apr";
monthArray[4] = "May";
monthArray[5] = "Jun";
monthArray[6] = "Jul";
monthArray[7] = "Aug";
monthArray[8] = "Sep";
monthArray[9] = "Oct";
monthArray[10] = "Nov";
monthArray[11] = "Dec";

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
          <h2 class="text-white">${monthArray[month] + " " + year.toString().substring(2,4)}</h2>
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
              var event = `<a href="event.html?event_id=${eventIds[j]}"><h6 class="text-white text-left">` + eventNames[j] + `</h6></a>`

              if(eventName != "")
                eventName += "<br>" + event;
              else
                eventName = event;
              //break;//max one event per day
            }
          }

          //Set the date Yellow if is the current day
          if(date == today.getDate() && today.getMonth() == month)
            dateHTML = `<h5 class="text-warning">${date}</h5>`;
          else
            dateHTML = `<h5 class="text-white">${date}</h5>`;

          // Construct card content
          const content = `
            <tr class="d-row">
              <td class="col-md-1 bordered_column text-center"><h5 class="text-white">${weekday[day]}</h5></td>
              <td col-md-1>${dateHTML}</td>
              <td col-md-10>${eventName}</td>
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
              <tr class="d-row align-items-center">
                <td class="col-md-1 bordered_column"></td>
                <td class="col-md-1 discussion"></td>
                <td class="col-md-10"></td>
              </tr>
            `;

            // Append newyly created card element to the container
            bodyContainer.innerHTML += content;

            // Find the first date that has an Event
            eventDate = getFirstDateWithEvent(date, month, year);

            //But if the current day(today) still needs to be drawed and is positioned before the eventDate, then draw today first
            if(i < today.getDate() && today.getDate() < eventDate && today.getMonth() == month)
              eventDate = today.getDate();
            
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