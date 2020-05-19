'use strict';


/**
 * People working in the Association
 * List of People working in the Association
 *
 * name String Name (optional)
 * surname String Surname (optional)
 * returns List
 **/
exports.peopleGET = function(name,surname) {
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


/**
 * Find Person by ID
 * Returns an Person
 *
 * personId Long ID of the person to return
 * returns Person
 **/
exports.peoplePersonIdGET = function(personId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

