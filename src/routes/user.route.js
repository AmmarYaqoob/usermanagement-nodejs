const Express = require('express');
const Router = Express.Router();
const Users = require("../controllers/users")

Router.route('/')
    .get(Users.Get)
    .post(Users.Add)
    .put(Users.Update);

Router.get('/:ID', Users.GetByID);
Router.delete('/:ID', Users.Delete);

module.exports = Router;