var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var qs = require('querystring');
require('./config/setupModel');

const studentsRoutes = require('./routes/studentsRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.set('query parse', str =>{
    return qs.parse(str);
})

app.use('/api/students', studentsRoutes);
app.listen(3000, () => {
    console.log("Server UP");
}) 

module.exports=app;