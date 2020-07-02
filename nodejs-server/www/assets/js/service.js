//Getting the URL passed parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const selectedServiceName = urlParams.get('service_name')

//Fetch the content of the Service and dynamically create the page
const serviceImgContainer         = document.getElementById('service_img');
const serviceNameContainer        = document.getElementById('service_name');
const serviceDescriptionContainer = document.getElementById('service_description');
const serviceMissionContainer     = document.getElementById('service_mission');
const breadcrumbContainer         = document.getElementById('breadcrumb_service_type');


//Fetch the content of the Service's Related Events and dynamically create the page
const eventsListContainer = document.getElementById('related_events_cards');


Promise.all([
  fetch("v2/services/?search=" + selectedServiceName),
  fetch("v2/services/events/?serviceName=" + selectedServiceName)            
]).then(function(responses) {
      if (!responses[0].ok || !responses[1].ok) {
          throw new Error("HTTP error, status1 = " + responses[0].status + ", status2 = " + responses[1].status);
      }
      return responses.map(function (response) {
        return response.json();
      });
  })
  .then(function(json) {
    //Service Fetch promise
    json[0].then(function(result) {   
      //var listItem = document.createElement("li");
      let {name, description, mission, img, type, date} = result[0];

      // Append newyly fetched info about the service to the containers
      serviceImgContainer.innerHTML += img;
      serviceNameContainer.innerHTML += selectedServiceName;
      serviceDescriptionContainer.innerHTML += description;
      serviceMissionContainer.innerHTML += mission;

      if(type == "t")
        breadcrumbContainer.innerHTML += "<a href='talks.html'><span>Talks</span></a>";
      else if(type == "w")
        breadcrumbContainer.innerHTML += "<a href='workshops.html'><span>Workshops</span></a>";
    });

    //Events Fetch promise
    json[1].then(function(result) { 
      for (var i = 0; i < result.length; i++) {
        let { id, name, img, description, contact_reference } = result[i];
        var desc = description.substr(1, 250) + ".."

        // Construct card content
        const content = `
        <div class="card">
              <img class="card-img-top w-100 d-block" src="${img}">
              <div class="card-body">
                <a href="event.html?event_id=${id}"><h4 class="card-title">${name}</h4></a>
                <p class="card-text">${desc}</p>
                <button class="btn btn-primary btn-block" href="event.html?event_id=${id}" type="button">SEE MORE</button>
              </div>
        </div>
        `;

        // Append newyly created card element to the container
        eventsListContainer.innerHTML += content;
      }
    });
  });