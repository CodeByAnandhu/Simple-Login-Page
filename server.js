const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const {v4:uuidv4} = require("uuid");
const nocache = require('nocache')         ///
const router = require('./router');


const app = express();

const port = process.env.PORT ||3000;

// Body Prsing the incoming start

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

// Body Prsing the incoming end

app.set('view engine','ejs');


//load static assets

app.use('/static',express.static(path.join(__dirname,'public')))

app.use('/assets',express.static(path.join(__dirname,'public/assets')))
 
app.use(nocache())   ////

// hide from user
app.use(session({
    secret:uuidv4(), 
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router);

// Home 

app.get('/',(req,res)=>{
    if(req.session.user){
        res.redirect('/route/dashboard')
    }else{

        res.render('base',{title:"Login System"});

    }

    
})

app.listen(port,()=>{console.log("Listening to the server on http://localhost:3000")});