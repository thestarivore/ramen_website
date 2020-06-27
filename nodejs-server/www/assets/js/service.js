//Getting the URL passed parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const person_id = urlParams.get('person_id')

//Fetch the content of the Event and dynamically create the page
const container = document.getElementById('person_content');


Promise.all([
  fetch("v2/service/"+person_id),
  fetch("v2/events")                 //Right now we search the person in each event //TODO:Create API v2/people/events
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
      //Person Fetch promise
      json[0].then(function(result) {   
        //var listItem = document.createElement("li");
        let {id, name, surname, img, description, role, email, phone} = result[0];
        //listItem.innerHTML = `${id} - ${name} - ${description} - ${contact_reference.name}`;

        //Create/Complete the Breadcrumb
        const bcontainer = document.getElementById('person_breadcrumb_page');
        const bcontent = `<span>${name} ${surname}</span>`;
        bcontainer.innerHTML += bcontent;

        // Construct card content
        const content = `
          <div class="intro">
            <h1 class="display-4 text-center">${name} ${surname}</h1>
            <p class="lead text-center">${role}</p>
          </div>
          <div class="row d-inline-flex justify-content-center">
            <div class="col-auto" style="padding-right: 0px;padding-left: 0px;"><img src="${img}" style="padding-bottom: 20px;"></div>
            <div class="col-xl-6 align-items-stretch">
              <p class="text-justify">${description}</p>
              <h4>Contacts</h4>
              <p class="lead">E-mail: ${email}<br>Phone: ${phone}</p>
            </div>
          </div>
        `;

        // Append newyly created card element to the container
        container.innerHTML += content;
      });

      //Events Fetch promise
      json[1].then(function(result) { 
        for (var i = 0; i < result.length; i++) {
          let {id, name, img, description, contact_reference, location, city} = result[i];

          //Get only the Events, where the current person is the contact reference
          if(contact_reference.id == person_id){
            //Fetch the content of the Sponsors and dynamically add them to the page
            const pecontainer = document.getElementById('person_event_content');

            var desc = description.substr(1, 250) + ".."

            // Construct card content
            const content = `
              <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4" style="padding: 15px 30px;">
                <div class="card">
                  <img class="card-img-top w-100 d-block" src="${img}">
                  <div class="card-body">
                    <h4 class="card-title">${name}</h4>
                    <p class="card-text">${desc}</p>
                    <button class="btn btn-primary btn-block" type="button">
                      <a href="event.html?event_id=${id}" class="btn btn-primary text-right">SEE MORE</a>
                    </button>
                  </div>
                </div>
              </div>
            `;

            // Append newyly created card element to the container
            pecontainer.innerHTML += content;
          }
        }
      });
    });