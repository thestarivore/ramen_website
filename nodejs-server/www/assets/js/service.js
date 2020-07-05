//Getting the URL passed parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const selectedServiceName = urlParams.get('service_name')

//Fetch the content of the Service and dynamically create the page
const serviceImgContainer         = document.getElementById('service_img');
const serviceNameContainer        = document.getElementById('service_name');
const serviceDescriptionContainer = document.getElementById('service_description');
//const serviceMissionContainer     = document.getElementById('service_mission');
const breadcrumbContainer         = document.getElementById('breadcrumb_service_type');
const peopleInvolvedContainer     = document.getElementById('people_involved');

//Fetch the content of the Service's Related Events and dynamically create the page
const eventsListContainer = document.getElementById('related_events_cards');


Promise.all([
  fetch("v2/services/?search=" + selectedServiceName),
  fetch("v2/services/events/?serviceName=" + selectedServiceName),  
  fetch("v2/services/people?serviceName=" + selectedServiceName)          
]).then(function(responses) {
      if (!responses[0].ok || !responses[1].ok) {
          throw new Error("HTTP error, status1 = " + responses[0].status + ", status2 = " + responses[1].status + ", status3 = " + responses[2].status);
      }
      return responses.map(function (response) {
        return response.json();
      });
  })
  .then(function(json) {
    //Service Fetch promise
    json[0].then(function(result) {   
      //var listItem = document.createElement("li");
      let {name, description, img, date} = result[0];

      // Append newyly fetched info about the service to the containers
      serviceImgContainer.innerHTML += `<img class="service-img img-fluid" src="${img}"></img>`;
      serviceNameContainer.innerHTML += selectedServiceName;
      serviceDescriptionContainer.innerHTML += description;
      //serviceMissionContainer.innerHTML += mission;
      breadcrumbContainer.innerHTML += "<span>" + name + "</span>";
    });

    //Events Fetch promise
    json[1].then(function(result) { 
      for (var i = 0; i < 3; i++) {
        let { id, name, img, description, service, contact_reference } = result[i];
        var desc = description.substr(0, 250) + ".."

        // Construct card content
        const content = `
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4 event-card">
          <div class="card h-100">
            <a href="event.html?event_id=${id}">
            <img class="card-img-top" src="${img}" alt="${name} image"></a>
            <div class="card-body d-flex flex-column justify-content-start">
              <a href="event.html?event_id=${id}"> <h4 class="card-title">${name}</h4></a>
              <p>${service.name}</p>
              <p>${desc}</p>
              <a class="btn btn-primary btn-block mt-auto" href="event.html?event_id=${id}" type="button">SEE MORE</a>
            </div>
          </div>
        </div>
        `;

        // Append newyly created card element to the container
        eventsListContainer.innerHTML += content;
      }
    });

    //People Fetch promise
    json[2].then(function(result) { 
      for (var i = 0; i < result.length; i++) {
        let {id, name, surname, commitment_type} = result[i];

        // Construct card content
        const content = `
          <li class="list-group-item"><a href="person.html?person_id=${id}">${name} ${surname} - ${commitment_type}</a></li>
        `;

        // Append newyly created card element to the container
        peopleInvolvedContainer.innerHTML += content;
      }
    });
  });