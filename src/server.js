
const express = require("express");
const app = express();


const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");


//Controllers
const contratoController = require("../controllers/ContratoController");
const tedController = require("../controllers/TedController");
const protocoloController = require("../controllers/ProtocoloController");

//view engine
app.set("view engine","ejs");
//Static folder
app.use(express.static("public"))
//bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//DB

const ted =[
    {
        nome:"ted",
        valor:"1",
        cpf:"1",
        ag:"1",
        conta:"1",
        banco:"Nubank",
    }
]
const protocolo = [
    {
        nome:"Fulano",
        valor:"345.79"
    }
]


//Routers
app.use("/",protocoloController);
app.use("/",tedController);
app.use("/",contratoController);
app.get("/",(request,response)=>{
    response.render("index")
})

const port  = process.env.PORT || 3001;

app.listen(port);