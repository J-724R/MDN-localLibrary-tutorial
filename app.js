const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require("http-errors");
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
// import express, {Express, Request, Response} from "express";
// import mongoose from 'mongoose';
// import path from 'path';
// import cookieParser from "cookie-parser";
// import createError from 'http-errors';
// import logger from "morgan";

require('dotenv').config()
const ADMIN = process.env.LIBRARY_ADMIN;
const PSW = process.env.LIBRARY_KEY; 

const app = express();

mongoose.set('strictQuery', false);
const mongoDB = `mongodb+srv://${ADMIN}:${PSW}@cluster0.gociypp.mongodb.net/?retryWrites=true&w=majority`;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');
// import indexRouter from "./routes/index.js"
// import usersRouter from "./routes/users.js"
// import usersCoolRouter from "./routes/users/cool.js"

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter)








// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
