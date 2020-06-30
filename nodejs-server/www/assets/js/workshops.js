const container = document.getElementById('workshops_row_list');
  
fetch("v2/services")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then(function(json) {
        for (var i = 0; i < json.length; i++) {
            //var listItem = document.createElement("li");
            let {name, img, description, mission, type} = json[i];
            //listItem.innerHTML = `${id} - ${name} - ${description} - ${contact_reference.name}`;
            //myEventsList.appendChild(listItem);
            var desc = description.substr(1, 250) + ".."

            if(type == 'w'){
              // Construct card content
              const content = `
                <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4" style="padding: 15px 30px;">
                  <div class="card">
                    <img class="card-img-top" src="${img}">
                    <div class="card-body">
                      <h4 class="card-title">${name}</h4>
                      <p>${desc}</p>
                      <button class="btn btn-primary btn-block" type="button">
                        <a href="service.html?service_name=${name}" class="btn btn-primary text-right">SEE MORE</a>
                      </button>
                    </div>
                  </div>
                </div>
              `;

              // Append newyly created card element to the container
              container.innerHTML += content;
            }
        }
    });