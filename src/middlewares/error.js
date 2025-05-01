const { ResponseObj } = require('../utils/responsewrapper');
const HttpStatus = require('../enums/httpstatus');

const ErrorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const ErrorMiddleware = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging

  let objRes = new ResponseObj;
  objRes.IsSuccess = err.statusCode || 500;
  objRes.Message = err.message || 'Internal Server Error';
  objRes.Stack = process.env.NODE_ENV === 'production' ? null : err.stack;

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(objRes);
};

module.exports = { ErrorConverter, ErrorMiddleware }