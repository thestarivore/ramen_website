'use strict';

var utils = require('../utils/writer.js');
var Sponsor = require('../service/SponsorService');

module.exports.sponsorsGET = function sponsorsGET (req, res, next) {
  var search = req.swagger.params['search'].value;
  Sponsor.sponsorsGET(search)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
