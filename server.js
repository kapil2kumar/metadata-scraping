const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require('morgan');

const apiRoutes = require("./routes/api");
const mainRoutes = require("./routes/main");

const logger = require('./logger');
const send_response = require('./send_response');


let app = express();

app.use(morgan('dev'));

// settings
app.set("view engine", "pug");
app.set("staticDir", path.join(__dirname, "static"));
app.use("/static", express.static(app.get("staticDir")));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// routes
app.use(apiRoutes);
app.use(mainRoutes);

app.use(function (err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
      let errorMessage = "";
      try {
        errorMessage = `${err.validations.body[0].property} ${err.validations.body[0].messages.join(", ")}`
      } catch (error) {
        errorMessage = err.validations.body;
      }
      var responseData = {
          status: false,
          msg: 'Validation_Error',
          data: null,
          error: errorMessage
      };
      return send_response.sendResponse(req,res,responseData, 400);
  } else {
    console.log(err);
    var errorData = {
        status: false,
        msg: err.message,
        data: null,
        error: err
    };
    return send_response.sendResponse(req,res,errorData, 500);
  }
});

const expressSwagger = require('express-swagger-generator')(app);
let options = {
  swaggerDefinition: {
      info: {
          description: 'METADATA SCRAPING FROM A GIVEN WEB PAGE URL',
          title: 'Swagger',
          version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '',
      produces: ["application/json"],
      schemes: ['http']
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/api.js'] //Path to the API handle folder
};
expressSwagger(options);

app.listen(3000, () => logger.info("App listening on port 3000!"))
