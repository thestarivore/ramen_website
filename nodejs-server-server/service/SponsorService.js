'use strict';

let sqlDb;
exports.sponsorsDbSetup = function(s) {
  sqlDb = s;
};

/**
 * Sponsors of Events
 * List of Sponsors that make donations to support Events
 *
 * search String Generic text search (optional)
 * returns List
 **/
exports.sponsorsGET = function(search) {
  var query = sqlDb('sponsor as s');
  
  //search Parameter
  if(search != null)
    query = query.where("s.name", "like", "%"+search+"%");

  return query.then(data => {
    return data.map( s => {
      s = { "img" : s.img,
            "name" : s.name,
            "description" : s.description,
            "company" : s.company}
      return s;
    })
  });
}

