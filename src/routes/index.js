const express = require('express');
const router = express.Router();
let authRoute = require("../routes/auth.route")
let userRoute = require("../routes/user.route")

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

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
