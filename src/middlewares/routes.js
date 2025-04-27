const Express = require('express');
const Router = Express.Router();
let { VerifyToken } = require("../middlewares/auth")
let Auth = require("../routes/auth.route")
let Users = require("../routes/user.route")
let Role = require('../routes/roles.route');

Router.use('/auth', Auth);
Router.use('/users', VerifyToken, Users);
// Router.use('/users', VerifyToken, Users);
Router.use('/roles', Role);

module.exports = Router;
