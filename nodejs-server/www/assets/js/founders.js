const container = document.getElementById('founders_row_list');
  
fetch("v2/people")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then(function(json) {
        for (var i = 0; i < json.length; i++) {
            let { id, name, surname, description, img, role, is_founder} = json[i];
            var desc = description.substr(1, 250) + ".."

            if(is_founder){
                // Construct card content
                const content = `
                <div class="col-md-12 col-lg-4 item">
                    <div class="box"><img class="rounded-circle" src="${img}">
                        <h3 class="name">${name}</h3>
                        <p class="title">${role}</p>
                        <p class="description">${desc}</p>
                        <div class="social"><a href="#"><i class="fa fa-facebook-official"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a></div>
                    </div>
                </div>
                `;

                // Append newyly created card element to the container
                container.innerHTML += content;
            }
        }
    });