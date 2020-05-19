'use strict';

let sqlDb;
exports.eventsDbSetup = function(s) {
  sqlDb = s;
  //console.log("Checking if event table exists");
  return sqlDb.schema.hasTable("event").then(exists => {
    if (!exists) {
      console.log("It doesn't exist");
    } else {
      console.log("It exists.");
    }
  });
};

/**
 * Find Event by ID
 * Returns an Event
 *
 * eventId Long ID of the event to return
 * returns Event
 **/
exports.eventsEventIdGET = function(eventId) {
  return sqlDb('event as e').join('person as p', 'p.id', 'e.contact_reference')
  .select({
    //Event
    date: "e.date",
    img: "e.img",
    city: "e.city",
    name: "e.name",
    description: "e.description",
    location: "e.location",
    id: "e.id",
    max_participants: "e.max_participants",
    //Person
    pBirthday :"p.birthday",
    pImg:"p.img",
    pRole:"p.role",
    pGender:"p.gender",
    pPhone:"p.phone",
    pSurname:"p.surname",
    pName:"p.name",
    pDescription:"p.description",
    pId:"p.id",
    pEmail:"p.email",
  }).where("e.id",eventId).then(data => {
    return data.map( e => {
      e = {"contact_reference" : {
            "birthday" : e.pBirthday,
            "img" : e.pImg,
            "role" : e.pRole,
            "gender" : e.pGender,
            "phone" : e.pPhone,
            "surname" : e.pSurname,
            "name" : e.pName,
            "description" : e.pDescription,
            "id" : e.pId,
            "email" : e.pEmail
          },
          "date" : e.date,
          "img" : e.img,
          "city" : e.city,
          "name" : e.name,
          "description" : e.description,
          "location" : e.location,
          "id" : e.id,
          "max_participants" : e.max_participants}
      return e;
    })
  });
}


/**
 * Events available on the Association
 * List of Events available on the Association
 *
 * search String Generic text search (optional)
 * ref_name String Reference contact name (optional)
 * ref_surname String Reference contact surname (optional)
 * returns List
 **/
exports.eventsGET = function(search, ref_name, ref_surname) {
  var query = sqlDb('event as e').join('person as p', 'p.id', 'e.contact_reference')
  .select({
    //Event
    date: "e.date",
    img: "e.img",
    city: "e.city",
    name: "e.name",
    description: "e.description",
    location: "e.location",
    id: "e.id",
    max_participants: "e.max_participants",
    //Person
    pBirthday :"p.birthday",
    pImg:"p.img",
    pRole:"p.role",
    pGender:"p.gender",
    pPhone:"p.phone",
    pSurname:"p.surname",
    pName:"p.name",
    pDescription:"p.description",
    pId:"p.id",
    pEmail:"p.email",
  });

  //search Parameter
  if(search != null){
    query = query.where("e.name", "like", "%"+search+"%");
  } 
  //ref_name,ref_surname Parameters
  else {
    if(ref_name != null){
      query = query.where("p.name", "like", "%"+ref_name+"%");

      if(ref_surname != null){
        query = query.andWhere("p.surname", "like", "%"+ref_surname+"%");
      }
    } else if(ref_surname != null){
      query = query.where("p.surname", "like", "%"+ref_surname+"%");
    }
  }

  return query.then(data => {
    return data.map( e => {
      e = {"contact_reference" : {
            "birthday" : e.pBirthday,
            "img" : e.pImg,
            "role" : e.pRole,
            "gender" : e.pGender,
            "phone" : e.pPhone,
            "surname" : e.pSurname,
            "name" : e.pName,
            "description" : e.pDescription,
            "id" : e.pId,
            "email" : e.pEmail
          },
          "date" : e.date,
          "img" : e.img,
          "city" : e.city,
          "name" : e.name,
          "description" : e.description,
          "location" : e.location,
          "id" : e.id,
          "max_participants" : e.max_participants}
      return e;
    })
  });
}


/**
 * Contact reference for the Event
 * Contact reference for the Event
 *
 * event_id Integer Event's ID
 * returns Person
 **/
exports.eventsReferenceGET = function(event_id) {
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


/**
 * List of the Sponsors for this Event
 * List of the Sponsors that have donated some money for this Event
 *
 * event_id Integer Event's ID
 * returns List
 **/
exports.eventsSponsorsGET = function(event_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "img" : "/pictures/barilla",
  "name" : "Barilla",
  "description" : "An Italian multinational food company, which is the world's largest pasta producer.",
  "company" : "Barilla s.p.a."
}, {
  "img" : "/pictures/barilla",
  "name" : "Barilla",
  "description" : "An Italian multinational food company, which is the world's largest pasta producer.",
  "company" : "Barilla s.p.a."
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

