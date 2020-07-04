const dropdowServicesListContainer = document.getElementById('dropdown_services_list');
  
fetch("v2/services")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then(function(json) {
        for (var i = 0; i < json.length; i++) {
            let {name} = json[i];
        
            // Construct card content
            const content = `
              <a class="dropdown-item" role="presentation" href="service.html?service_name=${name}">${name}</a>
            `;

            // Append newyly created card element to the container
            dropdowServicesListContainer.innerHTML += content;
        }
    });