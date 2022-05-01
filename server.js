const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');  //node module
require('dotenv').config();
const mongoose = require('mongoose') //db-connect
const session = require('express-session') //session-based authentication
const flash = require('express-flash');
const passport = require('passport')
const MongoStore = require('connect-mongo')
const PORT = process.env.PORT || 3300
const app = express();

//assets 
app.use(express.static('public'))

app.use(express.urlencoded({extended: false})) //for receiving the data from cust..

app.use(express.json())
//db-connection
async function initMongoDB() {
   await mongoose.connect(process.env.MONGO_URL, (err) =>{
       if (err) {
           console.log('error in connecting DB')
       } else{
           console.log('successfully-connected-to-db')
       }
   })
}
initMongoDB()



//session-config--
app.use(session({
    secret: "mySecretKey",
    resave: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URL}),
    saveUninitialized: false,
    cookie: {maxAge:1000*60*60*24} //i.e. 24hrs..
}));

//passport -config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash()) //middleware


//global-Middleware--
app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//set template engine 
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
//importing routes
require('./routes/web')(app)




















