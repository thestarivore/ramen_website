const upcominfEventsContainer = document.getElementById('upcoming_events');
const foundersContainer = document.getElementById('founders_list');
const sponsorsContainer = document.getElementById('sponsors_list');
const servicesContainer = document.getElementById('services_list'); 

Promise.all([
  fetch("v2/events"),
  fetch("v2/people"),     
  fetch("v2/sponsors"),      
  fetch("v2/services"),  
]).then(function(responses) {
      if (!responses[0].ok || !responses[1].ok || !responses[2].ok || !responses[3].ok) {
          throw new Error("HTTP error, status1 = " + responses[0].status + ", status2 = " + responses[1].status + ", status3 = " + responses[2].status+ ", status4 = " + responses[3].status);
      }
      return responses.map(function (response) {
        return response.json();
      });
  })
  .then(function(json) {
    //Events Fetch promise
    json[0].then(function(result) {   
      for (var i = 0; i < 3; i++) {
        let { id, name, img, description, service, contact_reference } = result[i];
        var desc = description.substr(0, 150) + ".."

        // Construct card content
        const content = `
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4 event-card">
        <div class="card h-100">
          <a href="event.html?event_id=${id}"><img class="card-img-top" src="${img}" alt="${name} image"></a>
          <div class="card-body d-flex flex-column justify-content-start">
            <a href="event.html?event_id=${id}"><h4 class="card-title">${name}</h4></a>
            <p>${service.name}</p>
            <p>${desc}</p>
            <a class="btn btn-primary btn-block mt-auto" href="event.html?event_id=${id}" type="button">SEE MORE</a>
          </div>
        </div>
        </div>
        `;

        // Append newyly created card element to the container
        upcominfEventsContainer.innerHTML += content;
      }
    });

    //Founders Fetch promise
    json[1].then(function(result) { 
      for (var i = 0; i < result.length; i++) {
        let { id, name, surname, description, img, role, is_founder} = result[i];
        var desc = description.substr(0, 150) + ".."

        if(is_founder){
            // Construct card content
            const content = `
            <div class="col-md-6 col-lg-4 item">
            <a href="person.html?person_id=${id}"><img class="rounded-circle" src="${img}" alt="${name} ${surname} image"></a>
              <a href="person.html?person_id=${id}"><h3 class="name">${name}</h3></a>
              <p class="title lead">${role}</p>
              <p class="lead">${desc}</p>
              <div class="social">
              <a href="https://www.facebook.com/" aria-label="FACEBOOK"><i class="icon ion-social-facebook"></i></a>
              <a href="https://twitter.com/" aria-label="TWITTER"><i class="icon ion-social-twitter"></i></a>
              <a href="https://www.instagram.com/" aria-label="INSTAGRAM"><i class="icon ion-social-instagram"></i></a>
              </div>
            </div>
            `;

            // Append newyly created card element to the container
            foundersContainer.innerHTML += content;
        }
      }
    });

    //Sponsors Fetch promise
    json[2].then(function(result) { 
      for (var i = 0; i < result.length; i++) {
        let {company, img} = result[i];

        // Construct card content
        const content = `
          <img src="${img}"> 
        `;

        // Append newyly created card element to the container
        sponsorsContainer.innerHTML += content;
      }
    });

    //Services Fetch promise
    json[3].then(function(result) { 
      for (var i = 0; i < result.length; i++) {
        let {name, description, img, date} = result[i];

        // Construct card content
        const content = `
        <div class="col-12 col-md-6">
          <a href="service.html?service_name=${name}">
            <div class="card">
                <img class="card-img-service w-100 d-block" src="${img}" alt="${name} image">
                <div class="card-img-overlay d-flex justify-content-center align-items-center">
                    <h4 class="card-title text-white">${name}</h4>
                </div>
            </div>
          </a>
        </div>
        `;

        // Append newyly created card element to the container
        servicesContainer.innerHTML += content;
      }
    });
  });