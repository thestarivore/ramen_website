'use strict';


/**
 * Login
 * Login with a form
 *
 * username String 
 * password String 
 * no response value expected for this operation
 **/
exports.usersLoginPOST = function(username,password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Data of the user of the current session
 *
 * returns User
 **/
exports.usersMePOST = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 1,
  "name" : "Vittorio",
  "surname" : "Dino",
  "email" : "vit@gmail.com"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

