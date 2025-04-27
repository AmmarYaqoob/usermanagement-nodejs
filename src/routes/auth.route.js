const Express = require('express');
const Router = Express.Router();
const User = require("../controllers/auth")

Router.post('/signup', (req, res) => {
	User.Signup(req, res);
});

Router.post('/login', (req, res) => {
	User.Login(req, res);
});

Router.get('/resetpassword', (req, res) => {
	User.ResetPassword(req, res);
});

Router.get('/forgetpassword', (req, res) => {
	User.ForgetPassword(req, res);
});

Router.get('/logout', (req, res) => {
	User.Logout(req, res);
});

Router.post('/refreshtoken', (req, res) => {
	User.RefreshToken(req, res);
});

module.exports = Router;