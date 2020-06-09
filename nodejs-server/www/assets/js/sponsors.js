const container = document.getElementById('sponsors_row_list');
  
fetch("v2/sponsors")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then(function(json) {
        for (var i = 0; i < json.length; i++) {
            let {company, img} = json[i];

            // Construct card content
            const content = `
                <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4 sponsor">
                    <div class="text-left"> 
                        <p>${company}</p>
                    </div>
                    <img src="${img}" class="sponsor-img" alt="..."> 
                </div>
            `;

            // Append newyly created card element to the container
            container.innerHTML += content;
        }
    });