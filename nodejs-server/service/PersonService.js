'use strict';

let sqlDb;
exports.peopleDbSetup = function(s) {
  sqlDb = s;
};

/**
 * People working in the Association
 * List of People working in the Association
 *
 * name String Name (optional)
 * surname String Surname (optional)
 * returns List
 **/
exports.peopleGET = function(name,surname) {
  var query = sqlDb('person as p');
  
  //name & surname Parameters
  if(name != null){
    query = query.where("p.name", "like", "%"+name+"%");

    if(surname != null){
      query = query.andWhere("p.surname", "like", "%"+surname+"%");
    }
  } else if(surname != null){
    query = query.where("p.surname", "like", "%"+surname+"%");
  }

  return query.then(data => {
    return data.map( p => {
      p = { "birthday" : p.birthday,
            "img" : p.img,
            "role" : p.role,
            "gender" : p.gender,
            "phone" : p.phone,
            "surname" : p.surname,
            "name" : p.name,
            "description" : p.description,
            "id" : p.id,
            "email" : p.email,
            "is_founder" : p.is_founder}
      return p;
    })
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
  return sqlDb('person as p').where("p.id",personId).then(data => {
    return data.map( p => {
      p = { "birthday" : p.birthday,
            "img" : p.img,
            "role" : p.role,
            "gender" : p.gender,
            "phone" : p.phone,
            "surname" : p.surname,
            "name" : p.name,
            "description" : p.description,
            "id" : p.id,
            "email" : p.email,
            "is_founder" : p.is_founder}
      return p;
    })
  });
}

