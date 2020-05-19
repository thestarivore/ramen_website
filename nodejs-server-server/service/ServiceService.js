'use strict';


/**
 * Services available at Events
 * List of Services available at a Event
 *
 * search String Generic text search (optional)
 * returns List
 **/
exports.servicesGET = function(search) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "12-05-2020 12:00:00",
  "mission" : "Offer the best cooking experience and best tasting experience regarding noodles",
  "img" : "/pictures/noodles_service",
  "name" : "Teach how to do noodles",
  "description" : "Teaching how to make noodles from the best cooks.",
  "event" : {
    "contact_reference" : {
      "birthday" : "31-05-1990",
      "img" : "/pictures/ginomirtino",
      "role" : "apprentice cook",
      "gender" : "male",
      "phone" : "3249412355",
      "surname" : "Mirtino",
      "name" : "Gino",
      "description" : "apprentice cook, trying to help during the cooking events",
      "id" : 6,
      "email" : "gino@gmail.com"
    },
    "date" : "12-05-2020 12:00:00",
    "img" : "/pictures/noodles",
    "city" : "Milan",
    "name" : "How to make perfect noodles",
    "description" : "A perfect opportunity to learn how to make noodles from the best noodles master.",
    "location" : "Hotel PerfectNoodles",
    "id" : 0,
    "max_participants" : 20
  }
}, {
  "date" : "12-05-2020 12:00:00",
  "mission" : "Offer the best cooking experience and best tasting experience regarding noodles",
  "img" : "/pictures/noodles_service",
  "name" : "Teach how to do noodles",
  "description" : "Teaching how to make noodles from the best cooks.",
  "event" : {
    "contact_reference" : {
      "birthday" : "31-05-1990",
      "img" : "/pictures/ginomirtino",
      "role" : "apprentice cook",
      "gender" : "male",
      "phone" : "3249412355",
      "surname" : "Mirtino",
      "name" : "Gino",
      "description" : "apprentice cook, trying to help during the cooking events",
      "id" : 6,
      "email" : "gino@gmail.com"
    },
    "date" : "12-05-2020 12:00:00",
    "img" : "/pictures/noodles",
    "city" : "Milan",
    "name" : "How to make perfect noodles",
    "description" : "A perfect opportunity to learn how to make noodles from the best noodles master.",
    "location" : "Hotel PerfectNoodles",
    "id" : 0,
    "max_participants" : 20
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * List of the People involeved
 * List of the People involeved/working for this Service
 *
 * service_name String Service's name
 * returns List
 **/
exports.servicesPeopleGET = function(service_name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "birthday" : "31-05-1990",
  "img" : "/pictures/ginomirtino",
  "role" : "apprentice cook",
  "gender" : "male",
  "phone" : "3249412355",
  "surname" : "Mirtino",
  "name" : "Gino",
  "description" : "apprentice cook, trying to help during the cooking events",
  "id" : 6,
  "email" : "gino@gmail.com"
}, {
  "birthday" : "31-05-1990",
  "img" : "/pictures/ginomirtino",
  "role" : "apprentice cook",
  "gender" : "male",
  "phone" : "3249412355",
  "surname" : "Mirtino",
  "name" : "Gino",
  "description" : "apprentice cook, trying to help during the cooking events",
  "id" : 6,
  "email" : "gino@gmail.com"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

