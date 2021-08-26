const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var session = require('express-session')
var sequelize = require('./connection');
const bodyParser = require('body-parser');
var fileupload = require("express-fileupload");


var path = require('path');
const {DataTypes} = require("sequelize");

var users = require('./models/users');
var items = require('./models/items');
var invoice = require('./models/invoice');
var system_info = require('./models/system_info');
var UserController = require('./controllers/UserController');
var ItemController = require('./controllers/ItemController');


// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

app.engine('.html', require('ejs').__express);


// Optional since express defaults to CWD/views

app.set('views', path.join(__dirname, 'views'));

// Path to our public directory
const excelToJson = require('convert-excel-to-json');

app.use(express.static(path.join(__dirname, 'files')));

// app.use(express.static('public'))


// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 10 * 60 * 1000
    },
    rolling: true
}))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '100mb'}));

app.use(fileupload());


app.get('/api/isLog', UserController.isLog)
app.get('/api/role', UserController.role)
app.post('/api/cart/order', UserController.order)

app.post('/api/save_as_excel', UserController.saveAsExcel);
app.post('/api/update/item/img', UserController.updateImg);
app.post('/api/log', UserController.Log)
app.post('/api/register', UserController.register)
// app.post('/api/update/item', ItemController.update)
app.post('/api/item/update', UserController.update)
app.post('/api/user/checkforgetkey', UserController.CheckForgetKey)

app.get('/api/user/getItems', UserController.getItems)

app.get('/api/user/logout', UserController.LogOut)
app.get('/api/user/forget', UserController.sendForgetMail)
app.get('/api/welcome/items', UserController.welcomeItems)


sequelize.sync({alter: true}).then(() => {
    app.listen(port, () => {
        console.log(`Example,  app listening at http://localhost:${port}`)
    })
}).catch((e) => {
    console.log('error', e)
})
