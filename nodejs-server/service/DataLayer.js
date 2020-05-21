let { eventsDbSetup } = require("./EventService");
let { peopleDbSetup } = require("./PersonService");
let { servicesDbSetup } = require("./ServiceService");
let { sponsorsDbSetup } = require("./SponsorService");
let { usersDbSetup } = require("./UserService");
const sqlDbFactory = require("knex");
/*let sqlDb = sqlDbFactory({
    debug: true,
    client: "postgres",
    connection: {
        host: "127.0.0.1", //process.env.DATABASE_URL, //console: DATABASE_URL=localhost node index.js
        port: "6666",
        user: "postgres",
        password:"password",
        database: "association_db"
    },
    ssl: true
});*/
let sqlDb = sqlDbFactory({
    debug: true,
    client: "postgres",
    connection: {
        host: "ec2-54-247-89-181.eu-west-1.compute.amazonaws.com",//process.env.DATABASE_URL, //console: DATABASE_URL=localhost node index.js
        port: "5432",
        user: "vvqmvwqvrqdhcr",
        password:"85f00315a44591755124959e8b3784a660d3f86cbbb3d05416dd31bc633a57d7",
        database: "deaun6c6p3ojga"
    },
    ssl: true
});
function setupDataLayer() {
    console.log("Setting up Data Layer");
    peopleDbSetup(sqlDb);
    servicesDbSetup(sqlDb);
    sponsorsDbSetup(sqlDb);
    usersDbSetup(sqlDb);
    return eventsDbSetup(sqlDb);
}
module.exports = { database: sqlDb, setupDataLayer };