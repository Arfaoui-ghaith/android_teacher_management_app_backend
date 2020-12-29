const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController.js');

const classeRouter = require('./routes/classeRoutes');
const userRouter = require('./routes/userRoutes');
const studentRouter = require('./routes/studentRoutes');

app.use(morgan('dev'));

app.use(express.json());



app.use('/api/v1/classes', classeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/students', studentRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`,404))
});

app.use(globalErrorHandler);

module.exports = app;
