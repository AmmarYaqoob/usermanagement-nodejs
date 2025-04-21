const Dotenv = require('dotenv');
Dotenv.config();
const App = require("./app");
const { Bootstrap } = require("./bootstrap/index");

Bootstrap().then((value) => {
  const port = process.env.PORT || 3000;
  App.listen(port, () => {
    console.info('server started on port %d', port);
  });
}).catch((err) => {
  throw new Error(err);
});

module.exports = App;


















// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const cors = require('cors');
// const fileUpload = require('express-fileupload');

// var config = require('./config');
// const database = require('./server/connection/database');
// app.use(fileUpload());
// module.exports = app;

// app.use(bodyParser.json({ limit: '500MB' }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // app.use(express.static('web'));

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

// const verifyToken = require('./server/middleware/Auth');
// app.use(function (req, res, next) {
//   console.log('aaaa')
//   if (req.url.includes('/signup') || req.url.includes('/login') || req.url.includes('/Verify') || req.url.includes('/logout')) {
//     next();
//   } else {
//     next();
//     // verifyToken(req, res, next);
//   }
// });

// var routeMiddleware = require("./server/routes/routesmiddleware");
// app.use('/api', routeMiddleware);

// var server = require('http').createServer(app);

// // start http server
// server.listen(config.port, () => {
//   console.log('We are live on a very common port: ' + config.port);
// });

