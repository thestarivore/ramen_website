const container = document.getElementById('sponsors');
  
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
                <img src="${img}" alt="${company} image"> 
            `;

            // Append newyly created card element to the container
            container.innerHTML += content;
        }
    });