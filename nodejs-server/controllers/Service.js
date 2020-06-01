'use strict';

var utils = require('../utils/writer.js');
var Service = require('../service/ServiceService');

module.exports.servicesGET = function servicesGET (req, res, next) {
  var search = req.swagger.params['search'].value;
  Service.servicesGET(search)
    .then(function (response) {
      if(response.length > 0)
        utils.writeJson(res, response, 200);
      else if(response.length == 0){ 
        response[0] = "Not Found. You requested a resource that could not be found or does not exist.";
        utils.writeJson(res, response, 404);
      } else {
        response[0] = "Internal server error.";
        utils.writeJson(res, response, 500);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesPeopleGET = function servicesPeopleGET (req, res, next) {
  var service_name = req.swagger.params['serviceName'].value;
  Service.servicesPeopleGET(service_name)
    .then(function (response) {
      if(response.length > 0)
        utils.writeJson(res, response, 200);
      else if(response.length == 0){ 
        response[0] = "Not Found. You requested a resource that could not be found or does not exist.";
        utils.writeJson(res, response, 404);
      } else {
        response[0] = "Internal server error.";
        utils.writeJson(res, response, 500);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
