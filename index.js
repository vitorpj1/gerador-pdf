const path = require("path")
const express = require("express");
const app = express();
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

//view engine
app.set("view engine","ejs");

app.use(session(
    {
        secret:"secret",
        resave:true,
        saveUninitialized:true,
        cookie:{ maxAge: 60000 }
    }))


app.use(flash());


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

