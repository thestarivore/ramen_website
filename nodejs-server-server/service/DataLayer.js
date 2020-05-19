let { eventsDbSetup } = require("./EventService");
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
    return eventsDbSetup(sqlDb);
}
module.exports = { database: sqlDb, setupDataLayer };