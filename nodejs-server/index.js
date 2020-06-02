'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = process.env.PORT; //8080 ;//8080;
//var serverPort = 8080; //8080 ;//8080;
var serveStatic = require("serve-static");
let { setupDataLayer } = require("./service/DataLayer");

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
//var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var spec = fs.readFileSync(path.join(__dirname,'www/backend/spec.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  var uiOptions = {
    apiDocs: '/backend/api-docs',
    swaggerUi: '/backend/swaggerui'
  }
  app.use(middleware.swaggerUi(uiOptions));

  //Serve the static assets from the /www flder
  process.env.PWD = process.cwd()
  //app.use(serveStatic(__dirname + "/www"));           //Local
  app.use(serveStatic(process.env.PWD + '/www'));       //Heroku

  // Initialize the Swagger middleware
  /*swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
    // ...
    setupDataLayer().then(() => {
      // Start the server
      http.createServer(app).listen(serverPort, function() {
        console.log(
          "Your server is listening on port %d (http://localhost:%d)",
          serverPort,
          serverPort
        );
        console.log(
          "Swagger-ui is available on http://localhost:%d/backend/swaggerui/",
          serverPort
        );
      });
    });
  });*/

  // Start the server
  setupDataLayer().then(() => {
    http.createServer(app).listen(serverPort, function () {
      console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
      console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
  }

});
