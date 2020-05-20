let { eventsDbSetup } = require("./EventService");
let { peopleDbSetup } = require("./PersonService");
let { servicesDbSetup } = require("./ServiceService");
let { sponsorsDbSetup } = require("./SponsorService");
let { usersDbSetup } = require("./UserService");
const sqlDbFactory = require("knex");
let sqlDb = sqlDbFactory({
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