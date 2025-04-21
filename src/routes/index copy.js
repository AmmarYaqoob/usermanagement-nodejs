const express = require('express');
const router = express.Router();
let Authentication = require("../routes/authentication")
let Users = require("../routes/users")

const defaultRoutes = [
	{
		path: '/auth',
		route: authRoute,
	},
	{
		path: '/users',
		route: userRoute,
	},
];

module.exports = router;
