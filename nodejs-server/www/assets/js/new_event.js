//Getting the URL passed parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const event_id = urlParams.get('event_id')

//Fetch the content of the Event and dynamically create the page
const container = document.getElementById('event_elements');


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
        let { id, name, img, description, contact_reference, location, city} = result[0];
        //listItem.innerHTML = `${id} - ${name} - ${description} - ${contact_reference.name}`;

        // Construct page elements
        const content = `
        <div class="container-fluid justify-content-start justify-content-xl-center" style="padding-top: 20px;margin-top: 0px;padding-right: 40px;padding-left: 40px;">
            <div class="row justify-content-between">
                <div class="col-auto text-left d-flex justify-content-start align-items-center order-2 order-sm-1 order-md-1 order-lg-1 order-xl-1"><a href="event.html?event_id=${id}" id="previous_event_link">&lt;&lt;&lt; Prev Event</a></div>
                <div class="col-12 col-sm-auto col-md-auto col-lg-auto col-xl-auto order-1 order-sm-2 order-md-2 order-lg-2 order-xl-2">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html"><span>Home</span></a></li>
                        <li class="breadcrumb-item"><a href="events.html"><span>Events</span></a></li>
                        <li class="breadcrumb-item"><a href="events.html"><span>Workshops</span></a></li>
                        <li class="breadcrumb-item active"><span>Title</span></li>
                    </ol>
                </div>
                <div class="col-auto text-right d-inline-flex justify-content-end align-items-center order-3"><a href="event.html?event_id=${id}" id="next_event_link">Next Event &gt;&gt;&gt;</a></div>
            </div>
            <div class="row justify-content-center">
                <div class="col-auto">
                    <div class="row justify-content-center">
                        <div class="col-auto d-flex justify-content-center" style="padding: 0px 0px;"><img class="img-fluid" src="${img}" style="padding: 20px 0px;padding-bottom: 20px;"></div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <div class="intro"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h1 class="display-4 text-center">${name}</h1>
                        </div>
                    </div>
                    <div class="row justify-content-around" style="margin-bottom: 40px;">
                        <div class="col-sm-12 col-lg-8 text-justify">
                            <h4>Event type</h4>
                            <p>${description}</p>
                            <div class="row">
                                <div class="col-2" style="padding-right: \;">
                                    <h5 class="text-left">where:</h5>
                                </div>
                                <div class="col-sm-4 justify-content-start">
                                    <p>${location}, ${city}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2">
                                    <h5 class="text-left">when:</h5>
                                </div>
                                <div class="col-sm-4 justify-content-start">
                                    <p>Paragraph</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2">
                                    <h5 class="text-left"><a href="#">details</a></h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 align-self-start">
                            <h4 class="text-center">related events</h4>
                            <div class="list-group" id="events_group_index">

                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col">
                            <h4 class="text-center">sponsors</h4>
                            <div class="row brands" style="margin-bottom: 40px;" id="event_sponsors">
                               
                            </div>
                            <div class="row map-clean">
                                <div class="col"><iframe allowfullscreen="" frameborder="0" src="https://cdn.bootstrapstudio.io/placeholders/map.html" width="100%" height="450" style="margin-bottom: 40px;"></iframe></div>
                            </div>
                        </div>
                    </div>
                </div>
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
            <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4 sponsor">
              <div class="text-left"> 
                <p>${company}</p>
              </div>
              <img src="${img}" class="event-img" alt="..."> 
            </div>
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
            <button class="list-group-item list-group-item-action"><a href="event.html?event_id=${id}" class="text-muted"><span class="d-flex justify-content-center">${name}</span></a></button>
            `;
          } else {
            content = `
            <button class="list-group-item list-group-item-action"><a href="event.html?event_id=${id}"><span class="d-flex justify-content-center">${name}</span></a></button>
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