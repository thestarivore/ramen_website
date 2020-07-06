//Getting the URL passed parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const event_id = urlParams.get('event_id')

//Fetch the content of the Event and dynamically create the page
const container = document.getElementById('event_content');


Promise.all([
  fetch("v2/events/"+event_id),
  fetch("v2/events/sponsors?eventId="+event_id),
  fetch("v2/events/")
])
//fetch("v2/events/"+event_id)
    .then(function(responses) {
        if (!responses[0].ok || !responses[1].ok) {
            throw new Error("HTTP error, status1 = " + responses[0].status + ", status2 = " + responses[1].status);
        }
        //return response.json();

        return responses.map(function (response) {
          return response.json();
        });
    })
    .then(function(json) {
      //Event Fetch promise
      json[0].then(function(result) {   
        //var listItem = document.createElement("li");
        let { id, name, img, description, contact_reference, location, city, service, date } = result[0];
        //listItem.innerHTML = `${id} - ${name} - ${description} - ${contact_reference.name}`;

        //Create/Complete the Breadcrumb
        const bcontainer = document.getElementById('event_breadcrumb_page');
        const bcontent = `<span>${name}</span>`;
        bcontainer.innerHTML += bcontent;

        //Contact Ref content
        const contactRefcontent = `
        <a href="person.html?person_id=${contact_reference.id}">
          ${contact_reference.name} ${contact_reference.surname}</a>`;

        //Parse Date
        var pDate = new Date(date);

        // Construct card content
        const content = `
        <div class="col-sm-12 col-lg-8">
        <div class="intro"><h1 class="text-center">${name}</h1></div>
        <div class="col-auto d-flex justify-content-center"><img src="${img}" class="event-img" alt="${name} image"></div>

        <h4>${service.name} - ${pDate.toLocaleDateString()}</h4>
    
        <div class="text-justify"> 
            <p class="lead">${description}</p>
            <h4>WHERE?:</h4>
            <a href="https://www.google.it/search?q=${location},%20${city}" <p class="lead">${location}, ${city}</p></a>
            <h4>WHEN?:</h4>
            <p class="lead">${pDate.toLocaleString()}</p>
            <h4>Contact Reference:</h4>
            <p class="lead">${contactRefcontent} - <a href="mailto:${contact_reference.email}">${contact_reference.email}</a> - ${contact_reference.phone}</p>
    
            <h4>SPONSORS:</h4>
            <div class="row justify-content-around event-brands" id="event_sponsors">
        </div>
    
        <div class="row justify-content-between">
            <a href="event.html?event_id=${id}" id="previous_event_link" class="btn btn-primary" aria-label="Go to previous event">&lt;PREV</a>
            <a href="event.html?event_id=${id}" id="next_event_link" class="btn btn-primary pull-right" aria-label="Go to next event">Next&gt;</a>
        </div>
            
        </div>
        </div>
        <div class="col-sm-12 col-lg-4 related-events">
        <div class="card">
            <ul class="list-group list-group-flush" id="events_group_index">
            <li class="list-group-item">
                <h4>Related Events</h4>
            </li>
        
            </ul>
        </div>
        </div>
        `;

        // Append newyly created card element to the container
        container.innerHTML += content;
      });

      //Sponsors Fetch promise
      json[1].then(function(result) { 
        for (var i = 0; i < result.length; i++) {
          let {company, img} = result[i];

          //Fetch the content of the Sponsors and dynamically add them to the page
          const scontainer = document.getElementById('event_sponsors');

          // Construct card content
          const content = `
          <img src="${img}" alt="${company} logo"> 
          `;

          // Append newyly created card element to the container
          scontainer.innerHTML += content;
        }
      });

      //Events Fetch promise
      json[2].then(function(result) { 
        //Find current Event Index
        var currentIndex = 0;
        for (var i = 0; i < result.length; i++) {
          let {id} = result[i];
          if(event_id == id)
            currentIndex = i;
        }

        //Dynamically Create the Events Index
        for (var i = 0; i < result.length; i++) {
          let {id, name} = result[i];

          //Fetch the content of all the Events and dynamically create Events Index Menu
          const scontainer = document.getElementById('events_group_index');

          // Construct card content
          var content = "";
          if(i == currentIndex){
            content = `
                <li class="list-group-item bg-primary">
                  <a href="event.html?event_id=${id}" class="text-white text-left">${name}</a><br>
                </li>
            `;
          } else {
            content = `
                <li class="list-group-item">
                  <a href="event.html?event_id=${id}" class="text-left">${name}</a><br>
                </li>
            `;
          }

          // Append newyly created card element to the container
          scontainer.innerHTML += content;
        }

        //Set the Next Event Link
        var nextEvent = document.getElementById('next_event_link');
        if(currentIndex < (result.length - 1)){
          let {id} = result[currentIndex+1];
          nextEvent.setAttribute('href', 'event.html?event_id='+id);
        }
        else{//The current one is the last one
          let {id} = result[0];
          nextEvent.setAttribute('href', 'event.html?event_id='+id);
        }

        //Set the Previous Event Link
        var previousEvent = document.getElementById('previous_event_link');
        if(currentIndex > 0){
          let {id} = result[currentIndex-1];
          previousEvent.setAttribute('href', 'event.html?event_id='+id);
        }
        else{//The current one is the first one
          let {id} = result[result.length - 1];
          previousEvent.setAttribute('href', 'event.html?event_id='+id);
        }
      });
    });