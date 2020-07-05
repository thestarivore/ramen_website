'use strict';

let sqlDb;
exports.servicesDbSetup = function(s) {
  sqlDb = s;
};

/**
 * Services available at Events
 * List of Services available at a Event
 *
 * search String Generic text search (optional)
 * returns List
 **/
exports.servicesGET = function(search) {
  var query = sqlDb('service as s')
  .select({
    //Service
    date : "s.date",
    img : "s.img",
    name : "s.name",
    description : "s.description",
  });
  
  //search Parameter
  if(search != null)
    query = query.where("s.name", "like", "%"+search+"%");

  return query.then(data => {
    return data.map( s => {
      s = { "date" : s.date,
            "img" : s.img,
            "name" : s.name,
            "description" : s.description,
          }
      return s;
    })
  });
}

/**
 * List of the People involeved
 * List of the People involeved/working for this Service
 *
 * serviceName String Service's name
 * returns List
 **/
exports.servicesPeopleGET = function(serviceName) {
  var query = sqlDb('service as s')
  .join('commitment as c', 's.name', 'c.service')
  .join('person as p', 'p.id', 'c.person')
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
    pCommitmentType: "c.commitment_type",
  });
  
  //serviceName Parameter
  if(serviceName != null)
    query = query.where("s.name", "like", "%"+serviceName+"%");

  return query.then(data => {
    return data.map( s => {
      s = { "birthday" : s.pBirthday,
            "img" : s.pImg,
            "role" : s.pRole,
            "gender" : s.pGender,
            "phone" : s.pPhone,
            "surname" : s.pSurname,
            "name" : s.pName,
            "description" : s.pDescription,
            "id" : s.pId,
            "email" : s.pEmail,
            "commitment_type" : s.pCommitmentType}
      return s;
    })
  });
}

/**
 * List of the Events that offer this Service
 *
 * serviceName String Service's name
 * returns List of Events
 **/
exports.servicesEventsGET = function(serviceName) {
  var query = sqlDb('service as s')
  .join('event as e', 's.name', 'e.service')
  .join('person as p', 'p.id', 'e.contact_reference')
  .select({
    //Event
    eDate: "e.date",
    eImg: "e.img",
    eCity: "e.city",
    eName: "e.name",
    eDescription: "e.description",
    eLocation: "e.location",
    eId: "e.id",
    eMax_participants: "e.max_participants",
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
    //Service
    sDate : "s.date",
    sImg : "s.img",
    sName : "s.name",
    sDescription : "s.description",
  });
  
  //serviceName Parameter
  if(serviceName != null)
    query = query.where("s.name", "like", "%"+serviceName+"%");

  return query.then(data => {
    return data.map( e => {
      e = { 
            "contact_reference" : {
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
            "date": e.eDate,
            "img": e.eImg,
            "city": e.eCity,
            "name": e.eName,
            "description": e.eDescription,
            "location": e.eLocation,
            "id": e.eId,
            "max_participants": e.eMax_participants,
            "service" : {
              "date" : e.sDate,
              "img" : e.sImg,
              "name" : e.sName,
              "description" : e.sDescription,
            }
          }
      return e;
    })
  });
}