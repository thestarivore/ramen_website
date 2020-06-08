const container = document.getElementById('people_row_list');
  
fetch("v2/people")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then(function(json) {
        for (var i = 0; i < json.length; i++) {
            let { id, name, surname, img} = json[i];

            // Construct card content
            const content = `
              <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3" style="padding: 15px 30px;">
                  <div class="card">
                    <a href="person.html?person_id=${id}">
                      <img class="card-img-top w-100" src="${img}">
                    </a>
                    <div class="card-body text-center">
                        <h5 class="card-title" style="margin-bottom: 0px;"><strong>${name} ${surname}</strong></h5>
                    </div>
                  </div>
              </div>
            `;

            // Append newyly created card element to the container
            container.innerHTML += content;
        }
    });