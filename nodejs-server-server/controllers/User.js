'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.usersLoginPOST = function usersLoginPOST (req, res, next) {
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  User.usersLoginPOST(username,password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersMePOST = function usersMePOST (req, res, next) {
  User.usersMePOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
