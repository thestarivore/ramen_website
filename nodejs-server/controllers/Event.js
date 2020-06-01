'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.eventsEventIdGET = function eventsEventIdGET (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;

  Event.eventsEventIdGET(eventId)
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

module.exports.eventsGET = function eventsGET (req, res, next) {
  var search = req.swagger.params['search'].value;
  var ref_name = req.swagger.params['refName'].value;
  var ref_surname = req.swagger.params['refSurname'].value;
  Event.eventsGET(search,ref_name,ref_surname)
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

module.exports.eventsReferenceGET = function eventsReferenceGET (req, res, next) {
  var event_id = req.swagger.params['eventId'].value;
  Event.eventsReferenceGET(event_id)
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

module.exports.eventsSponsorsGET = function eventsSponsorsGET (req, res, next) {
  var event_id = req.swagger.params['eventId'].value;
  Event.eventsSponsorsGET(event_id)
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
