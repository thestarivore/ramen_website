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
            var desc = description.substr(0, 150) + ".."

            if(is_founder){
                // Construct card content
                const content = `
                <div class="col-md-6 col-lg-4 item"><a href="person.html?person_id=${id}"><img class="rounded-circle" src="${img}" alt="${name} ${surname} image"></a>
                  <a href="person.html?person_id=${id}"><h3 class="name">${name} ${surname}</h3></a>
                  <p class="title lead">${role}</p>
                  <p class="lead">${desc}</p>
                  <div class="social mt-auto">
                  <a href="https://www.facebook.com/" aria-label="FACEBOOK"><i class="icon ion-social-facebook"></i></a>
                  <a href="https://twitter.com/" aria-label="TWITTER"><i class="icon ion-social-twitter"></i></a>
                  <a href="https://www.instagram.com/" aria-label="INSTAGRAM"><i class="icon ion-social-instagram"></i></a>
                  </div>
                </div>
                `;

                // Append newyly created card element to the container
                container.innerHTML += content;
            }
        }
    });