
const express = require("express");
const app = express();
const fs = require('fs');


const bodyParser = require("body-parser");



//Controllers
const contratoController = require("../controllers/ContratoController");
const tedController = require("../controllers/TedController");
const protocoloController = require("../controllers/ProtocoloController");
const iofController = require("../controllers/IofController");
const ddaController = require("../controllers/DdaController");
const cldController = require("../controllers/CldController");
const cetController = require("../controllers/CetController");
const tltcController = require("../controllers/TltcController");

//view engine
app.set("view engine","ejs");
//Static folder
app.use(express.static("public"))
//bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routers
app.use("/",iofController);
app.use("/",protocoloController);
app.use("/",tedController);
app.use("/",contratoController);
app.use("/",ddaController);
app.use("/",cldController);
app.use("/",cetController);
app.use("/",tltcController);

app.get("/create-banco",(request,response)=>{
    response.render("add-banco");
})

app.post("/save-banco",(request,response)=>{
    const banco = JSON.stringify(request.body.banco);
    const nbanco = banco.replaceAll('"','');
    fs.writeFile('./bancos.txt', `,${nbanco}`,{encoding :'utf-8',flag:'a'}, function (err) {
        if (err) throw err;
      });
      
      response.redirect("/bancos"); 
})

app.get("/bancos",(request,response)=>{
    fs.readFile('./bancos.txt', 'utf-8', function (err, data) {
        if(err) throw err;
        console.log(data);
        let bancos = new Array();
        let separados = data.split(",");
        for (let i = 0; i < separados.length; i++){
            bancos.push(separados[i]);
        }
        response.redirect("/");
    })
    
})
app.get("/a",(request,response)=>{
    response.render("indexe")
})

const port  = process.env.PORT || 3001;

app.listen(port);
