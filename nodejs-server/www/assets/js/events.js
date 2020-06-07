const container = document.getElementById('events_row_list');
  
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
            let { id, name, img, description, contact_reference } = json[i];
            //listItem.innerHTML = `${id} - ${name} - ${description} - ${contact_reference.name}`;
            //myEventsList.appendChild(listItem);
            var desc = description.substr(1, 250) + ".."

            // Construct card content
            const content = `
              <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3" style="padding: 15px 15px;">
                <div class="card">
                  <img src="${img}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${desc}</p>
                    <div class="text-right"> 
                        <a href="event.html?event_id=${id}" class="btn btn-primary text-right">See more >></a>
                    </div>
                  </div>
                </div>
              </div>
            `;

            // Append newyly created card element to the container
            container.innerHTML += content;
        }
    });