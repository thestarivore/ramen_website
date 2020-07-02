const upcominfEventsContainer = document.getElementById('upcoming_events');
const foundersContainer = document.getElementById('founders_list');
const sponsorsContainer = document.getElementById('sponsors_list');

Promise.all([
  fetch("v2/events"),
  fetch("v2/people"),     
  fetch("v2/sponsors"),       
]).then(function(responses) {
      if (!responses[0].ok || !responses[1].ok || !responses[2].ok) {
          throw new Error("HTTP error, status1 = " + responses[0].status + ", status2 = " + responses[1].status + ", status3 = " + responses[2].status);
      }
      return responses.map(function (response) {
        return response.json();
      });
  })
  .then(function(json) {
    //Events Fetch promise
    json[0].then(function(result) {   
      for (var i = 0; i < 3; i++) {
        let { id, name, img, description, contact_reference } = result[i];
        var desc = description.substr(0, 150) + ".."

        // Construct card content
        const content = `
          <div class="card"><img class="card-img-top w-100 d-block" src="${img}">
            <div class="card-body">
              <h4 class="card-title">${name}</h4>
              <p class="card-text">${desc}</p>
              <button class="btn btn-primary btn-block" type="button">
                <a href="event.html?event_id=${id}" class="btn btn-primary text-right">SEE MORE</a>
              </button>
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
            <div class="col-md-6 col-lg-4 item"><img class="rounded-circle" src="${img}" href="person.html?person_id=${id}">
              <a href="person.html?person_id=${id}"><h3 class="name">${name}</h3></a>
              <p class="title">${role}</p>
              <p class="description">${desc}</p>
              <div class="social"><a href="#"><i class="fa fa-facebook-official"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a></div>
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
  });