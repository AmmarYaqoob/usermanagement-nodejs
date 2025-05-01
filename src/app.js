const Express = require('express');
const BodyParser = require('body-parser');
const helmet = require('helmet');
const Cors = require('cors');
const FileUpload = require('express-fileupload');
const ErrorMiddleWare = require("./middlewares/sequelizeerror")
let RouteMiddleware = require("./middlewares/routes");
let { ErrorConverter, ErrorMiddleware } = require("./middlewares/error");

const app = Express();
app.use(helmet());
app.use(Express.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Cors());
app.use(FileUpload());
app.use('/api', RouteMiddleware);

// app.use(ErrorMiddleWare)
app.use(ErrorConverter);
app.use(ErrorMiddleware);

module.exports = app;