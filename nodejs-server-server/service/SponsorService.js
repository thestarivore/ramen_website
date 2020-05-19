'use strict';


/**
 * Sponsors of Events
 * List of Sponsors that make donations to support Events
 *
 * search String Generic text search (optional)
 * returns List
 **/
exports.sponsorsGET = function(search) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "img" : "/pictures/barilla",
  "name" : "Barilla",
  "description" : "An Italian multinational food company, which is the world's largest pasta producer.",
  "company" : "Barilla s.p.a."
}, {
  "img" : "/pictures/barilla",
  "name" : "Barilla",
  "description" : "An Italian multinational food company, which is the world's largest pasta producer.",
  "company" : "Barilla s.p.a."
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

