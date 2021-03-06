const express = require('express');
const serverless = require('serverless-http');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');  //node module
require('dotenv').config();
const {mongoose} = require('mongoose') //db-connect
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
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL}),
    
    
    saveUninitialized: false,
    auto_reconnect: true,
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

//importing routes
require('./routes/web')(app)
//---------------------------//

app.listen(PORT, () =>{
    console.log( `listening on port ${PORT}`)
});




module.exports = app;
module.exports.handler = serverless(app)

























