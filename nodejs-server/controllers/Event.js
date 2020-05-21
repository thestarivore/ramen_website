'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.eventsEventIdGET = function eventsEventIdGET (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Event.eventsEventIdGET(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsGET = function eventsGET (req, res, next) {
  var search = req.swagger.params['search'].value;
  var ref_name = req.swagger.params['ref_name'].value;
  var ref_surname = req.swagger.params['ref_surname'].value;
  Event.eventsGET(search,ref_name,ref_surname)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsReferenceGET = function eventsReferenceGET (req, res, next) {
  var event_id = req.swagger.params['event_id'].value;
  Event.eventsReferenceGET(event_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsSponsorsGET = function eventsSponsorsGET (req, res, next) {
  var event_id = req.swagger.params['event_id'].value;
  Event.eventsSponsorsGET(event_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
