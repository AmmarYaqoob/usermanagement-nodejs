const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Sequelize Validation Error
  if (err.name === "SequelizeValidationError") {
    const message = err.errors.map((e) => e.message).join(", ");
    err = new ErrorHandler(message, 400);
  }

  // Sequelize Unique Constraint Error
  if (err.name === "SequelizeUniqueConstraintError") {
    const message = `Duplicate entry: ${err.errors[0].message}`;
    err = new ErrorHandler(message, 400);
  }

  // Sequelize Foreign Key Constraint Error
  if (err.name === "SequelizeForeignKeyConstraintError") {
    const message = `Invalid foreign key reference: ${err.message}`;
    err = new ErrorHandler(message, 400);
  }

  // Sequelize Database Error (e.g., invalid syntax, disallowed operations)
  if (err.name === "SequelizeDatabaseError") {
    const message = `Database error: ${err.message}`;
    err = new ErrorHandler(message, 500);
  }

  // Send the response
  res.status(err.statusCode).json({
    isSuccess: false,
    message: err.message,
  });
};
