'use strict';

var utils = require('../utils/writer.js');
var Person = require('../service/PersonService');

module.exports.peopleGET = function peopleGET (req, res, next) {
  var name = req.swagger.params['name'].value;
  var surname = req.swagger.params['surname'].value;
  Person.peopleGET(name,surname)
    .then(function (response) {
      if(response.length >= 0)
        utils.writeJson(res, response, 200);
      else {
        response[0] = "Internal server error.";
        utils.writeJson(res, response, 500);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.peoplePersonIdGET = function peoplePersonIdGET (req, res, next) {
  var personId = req.swagger.params['personId'].value;
  Person.peoplePersonIdGET(personId)
    .then(function (response) {
      if(response.length >= 0)
        utils.writeJson(res, response, 200);
      else {
        response[0] = "Internal server error.";
        utils.writeJson(res, response, 500);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
