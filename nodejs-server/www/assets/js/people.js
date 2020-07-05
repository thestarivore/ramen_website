//Getting the URL passed parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const selectedPage = urlParams.get('page');

//Fetch the content of the People and dynamically create the page
const peopleRowListContainer = document.getElementById('people_row_list');
const peopleNavContainer = document.getElementById('navigation_pages');

//Constants
const PEOPLE_PER_PAGE = 4;


fetch("v2/people")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then(function(json) {
        var numPeople = json.length;
        var numPages = Math.ceil(numPeople/PEOPLE_PER_PAGE);  
        var currentPage = (selectedPage != null) ? selectedPage : 1;

        //Set which People to print
        var first = (currentPage-1)*PEOPLE_PER_PAGE;
        var last = first + PEOPLE_PER_PAGE;
        if(currentPage == numPages)
            last = numPeople;

        for (var i = first; i < last; i++) {
            let { id, name, surname, img} = json[i];

            // Construct card content
            const content = `
              <div class="col-md-12 col-lg-6 col-xl-3" people-card>
                  <div class="card">
                    <a href="person.html?person_id=${id}"><img class="card-img-top w-100" src="${img}" alt="${name} ${surname} image"></a>
                    <div class="card-body text-center">
                        <a href="person.html?person_id=${id}"><h5 class="card-subtitle">${name} ${surname}</h5></a>
                    </div>
                  </div>
              </div>
            `;

            // Append newyly created card element to the container
            peopleRowListContainer.innerHTML += content;
        }

        //Create the Navigation Pattern
        //Add the Previuous button
        var prev = (currentPage == 1) ? numPages : parseInt(currentPage) - 1;
        peopleNavContainer.innerHTML += `
          <li class="page-item"><a class="page-link" href="people.html?page=${prev}" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
        `;

        //Add the pages nummbers
        for (var i = 0; i < numPages; i++) {
          var content = "";
          if(currentPage == i+1){
            content = `
              <li class="page-item"><a class="page-link font-weight-bold" href="people.html?page=${i+1}">${i+1}</a></li>
            `;
          } else {
            content = `
              <li class="page-item"><a class="page-link" href="people.html?page=${i+1}">${i+1}</a></li>
            `;
          }

          // Append newyly created card element to the container
          peopleNavContainer.innerHTML += content;
        }

        //Add the Next button
        var next = (currentPage == numPages) ? 1 : parseInt(currentPage) + 1;
        peopleNavContainer.innerHTML += `
          <li class="page-item"><a class="page-link" href="people.html?page=${next}" aria-label="Next"><span aria-hidden="true">»</span></a></li>
        `;
    });