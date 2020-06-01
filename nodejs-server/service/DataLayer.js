let { eventsDbSetup } = require("./EventService");
let { peopleDbSetup } = require("./PersonService");
let { servicesDbSetup } = require("./ServiceService");
let { sponsorsDbSetup } = require("./SponsorService");
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
    //debug: true,
    client: "postgres",
    connection: {
        host: "ec2-54-246-89-234.eu-west-1.compute.amazonaws.com",//process.env.DATABASE_URL, //console: DATABASE_URL=localhost node index.js
        port: 5432,
        user: "crcrtdbwyesceh",
        password:"f1ba8c44a1373109cb0efa9f2ef87d07ae4350c646c37b815257dd4115825446",
        database: "d75uevfb6avc3b"
    },
    ssl: true
});
function setupDataLayer() {
    console.log("Setting up Data Layer");
    peopleDbSetup(sqlDb);
    servicesDbSetup(sqlDb);
    sponsorsDbSetup(sqlDb);
    return eventsDbSetup(sqlDb);
}
module.exports = { database: sqlDb, setupDataLayer };