if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const countsRouter = require('./routes/counts');
const getRouter = require('./routes/get');
const addRouter = require('./routes/add');
const setRouter = require('./routes/set');
const statsRouter = require('./routes/stats');

require('./models/count');

const sequelize = require('./sequelize');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/counts', countsRouter);
app.use('/add', addRouter);
app.use('/get', getRouter);
app.use('/stats', statsRouter);
app.use('/set', setRouter);
app.use('/edit/:name', async (req, res) => {
  sequelize.models.Count.findOne({
    where: {
      name: req.params.name
    }
  }).then(countData => {
    res.render('edit', { title: 'Edit', countData, windowUrl: req.get('host')});
  });
})
app.use('/new', async (req, res) => {
    res.render('add', { title: 'Add New'});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
