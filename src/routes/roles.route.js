const Express = require('express');
const Router = Express.Router();
const Roles = require("../controllers/role")

Router.route('/')
    .get(Roles.Get)
    .post(Roles.Add)
    .put(Roles.Update);

Router.get('/:ID', Roles.GetByID);
Router.delete('/:ID', Roles.Delete);

module.exports = Router;