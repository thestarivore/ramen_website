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
  .join('event as e', 'e.id', 's.event')
  .join('person as p', 'p.id', 'e.contact_reference')
  .select({
    //Service
    date : "s.date",
    mission : "s.mission",
    img : "s.img",
    name : "s.name",
    description : "s.description",
    //Event
    eDate: "e.date",
    eImg: "e.img",
    eCity: "e.city",
    eName: "e.name",
    eDescription: "e.description",
    eLocation: "e.location",
    eId: "e.id",
    eMaxParticipants: "e.max_participants",
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
  if(search != null)
    query = query.where("s.name", "like", "%"+search+"%");

  return query.then(data => {
    return data.map( s => {
      s = { "date" : s.date,
            "mission" : s.mission,
            "img" : s.img,
            "name" : s.name,
            "description" : s.description,
            "event" : {
              "contact_reference" : {
                "birthday" : s.pBirthday,
                "img" : s.pImg,
                "role" : s.pRole,
                "gender" : s.pGender,
                "phone" : s.pPhone,
                "surname" : s.pSurname,
                "name" : s.pName,
                "description" : s.pDescription,
                "id" : s.pId,
                "email" : s.pEmail
              },
              "date" : s.eDate,
              "img" : s.eImg,
              "city" : s.eCity,
              "name" : s.eName,
              "description" : s.eDescription,
              "location" : s.eLocation,
              "id" : s.eId,
              "max_participants" : s.eMaxParticipants
            }
          }
      return s;
    })
  });
}

/**
 * List of the People involeved
 * List of the People involeved/working for this Service
 *
 * service_name String Service's name
 * returns List
 **/
exports.servicesPeopleGET = function(service_name) {
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
  });
  
  //service_name Parameter
  if(service_name != null)
    query = query.where("s.name", "like", "%"+service_name+"%");

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
            "email" : s.pEmail}
      return s;
    })
  });
}
