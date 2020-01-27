var express = require('express');
const path = require('path');
var app = express();
var bodyParser = require('body-parser');
let catalogController = require('./routes/catalogController');
let profileController = require('./routes/profileController');
var session = require('express-session');
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
//app.use('/assets', express.static('assets'));
app.use(express.static(path.join(__dirname, '/assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'Alohamora'}));

/*var studentInfo = require('./routes/studentInfo.js');
app.use('/studentInfo', studentInfo);

var index = require('./routes/index.js');
app.use('/*',index); */

app.use('/', catalogController);
app.use('/', profileController);
/*app.use('/myItems', catalogController);
app.use('/categories',catalogController);
app.use('/categories/:categoryName',catalogController);
app.use('/categories/item/:itemCode',catalogController);
app.use('/contact', catalogController);
app.use('/about', catalogController);
app.use('/feedback',   catalogController); */

module.exports=app;

app.listen(8080);
