'use strict';

var utils = require('../utils/writer.js');
var Service = require('../service/ServiceService');

module.exports.servicesGET = function servicesGET (req, res, next) {
  var search = req.swagger.params['search'].value;
  Service.servicesGET(search)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesPeopleGET = function servicesPeopleGET (req, res, next) {
  var service_name = req.swagger.params['service_name'].value;
  Service.servicesPeopleGET(service_name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
