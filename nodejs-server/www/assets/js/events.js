//Getting the URL passed parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const selectedPage = urlParams.get('page');

//Fetch the content of the Events and dynamically create the page
const eventsRowListContainer = document.getElementById('events_row_list');
const eventsNavContainer = document.getElementById('navigation_pages');

//Constants
const EVENTS_PER_PAGE = 3;
  
fetch("v2/events")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then(function(json) {
        var numEvents = json.length;
        var numPages = Math.ceil(numEvents/EVENTS_PER_PAGE);  
        var currentPage = (selectedPage != null) ? selectedPage : 1;

        //Set which events to print
        var first = (currentPage-1)*EVENTS_PER_PAGE;
        var last = first + EVENTS_PER_PAGE;
        if(currentPage == numPages)
            last = numEvents;

        //Create the Events Cards
        for (var i = first; i < last; i++) {
            let { id, name, img, description, contact_reference, service } = json[i];
            var desc = description.substr(0, 80) + ".."

            // Construct Event card content
            const content = `
              <div class="col-md-12 col-lg-6 col-xl-4 event-card">
                <div class="card h-100">
                  <a href="event.html?event_id=${id}"><img class="card-img-top" src="${img}" alt="${name} image"></a>
                  <div class="card-body d-flex flex-column justify-content-start">
                    <a href="event.html?event_id=${id}"><h4 class="card-title">${name}</h4></a>
                    <a href="service.html?service_name=${service.name}"><p>${service.name}</p></a>
                    <p>${desc}</p>
                    <a class="btn btn-primary btn-block mt-auto" href="event.html?event_id=${id}" type="button">SEE MORE</a>
                  </div>
                </div>
              </div>
            `;

            // Append newyly created card element to the container
            eventsRowListContainer.innerHTML += content;
        }

        //Create the Navigation Pattern
        //Add the Previuous button
        var prev = (currentPage == 1) ? numPages : parseInt(currentPage) - 1;
        eventsNavContainer.innerHTML += `
          <li class="page-item"><a class="page-link" href="events.html?page=${prev}" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
        `;

        //Add the pages nummbers
        for (var i = 0; i < numPages; i++) {
          var content = "";
          if(currentPage == i+1){
            content = `
              <li class="page-item"><a class="page-link font-weight-bold" href="events.html?page=${i+1}">${i+1}</a></li>
            `;
          } else {
            content = `
              <li class="page-item"><a class="page-link" href="events.html?page=${i+1}">${i+1}</a></li>
            `;
          }

          // Append newyly created card element to the container
          eventsNavContainer.innerHTML += content;
        }

        //Add the Next button
        var next = (currentPage == numPages) ? 1 : parseInt(currentPage) + 1;
        eventsNavContainer.innerHTML += `
          <li class="page-item"><a class="page-link" href="events.html?page=${next}" aria-label="Next"><span aria-hidden="true">»</span></a></li>
        `;
    });