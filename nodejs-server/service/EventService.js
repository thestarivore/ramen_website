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
 * refName String Reference contact name (optional)
 * refSurname String Reference contact surname (optional)
 * returns List
 **/
exports.eventsGET = function(search, refName, refSurname) {
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
  //refName,refSurname Parameters
  else {
    if(refName != null){
      query = query.where("p.name", "like", "%"+refName+"%");

      if(refSurname != null){
        query = query.andWhere("p.surname", "like", "%"+refSurname+"%");
      }
    } else if(refSurname != null){
      query = query.where("p.surname", "like", "%"+refSurname+"%");
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
 * eventId Integer Event's ID
 * returns Person
 **/
exports.eventsReferenceGET = function(eventId) {
  return sqlDb('event as e').join('person as p', 'p.id', 'e.contact_reference')
  .select({
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
    return data.map( p => {
      p = { "birthday" : p.pBirthday,
            "img" : p.pImg,
            "role" : p.pRole,
            "gender" : p.pGender,
            "phone" : p.pPhone,
            "surname" : p.pSurname,
            "name" : p.pName,
            "description" : p.pDescription,
            "id" : p.pId,
            "email" : p.pEmail}
      return p;
    })
  });
}


/**
 * List of the Sponsors for this Event
 * List of the Sponsors that have donated some money for this Event
 *
 * eventId Integer Event's ID
 * returns List
 **/
exports.eventsSponsorsGET = function(eventId) {
  return sqlDb('event as e')
  .join('sponsorship as sp', 'e.id', 'sp.event')
  .join('sponsor as s', 'sp.sponsor', 's.name')
  .select({
    //Sponsor
    img:"s.img",
    name:"s.name",
    description:"s.description",
    company:"s.company",
  }).where("e.id",eventId).then(data => {
    return data.map( s => {
      s = { "img" : s.img,
            "name" : s.name,
            "description" : s.description,
            "company" : s.company}
      return s;
    })
  });
}

