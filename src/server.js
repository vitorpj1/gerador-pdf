const path = require("path")
const express = require("express");
const app = express();
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const res = require("express/lib/response");

//view engine
app.set("view engine","ejs");

//Static folder
app.use(express.static("public"))

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

//console.log(__dirname)

const cliente = [
    {
        nome:"teste",
        valor:"1",
        cpf:"1",
        ag:"1",
        conta:"1",
        banco:"Nubank",
        vencimento:"1",
        nParcelas:"1",
        horario: "1",
        dia:"1"
    }
        
]

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


app.get("/contrato", async(request,response)=>{

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

    const page = await browser.newPage();

    await page.goto("https://gerador-pdf.herokuapp.com/contract",{
        waitUntil:"networkidle0"
    })

    const pdf = await page.pdf({
        printBackground:true,
        format:"a4",
        width:"8.27in",
        height:"11.7in"
    })

    await browser.close();

    response.contentType("application/pdf")
    
    return response.send(pdf);
})


app.get("/ted", async(request,response)=>{

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto("https://gerador-pdf.herokuapp.com/tedi",{
        waitUntil:['domcontentloaded', 'networkidle0']
    })

    const pdf = await page.pdf({
        printBackground:true,
        format:"a4",
        width:"8.27in",
        height:"11.7in"
    })

    await browser.close();

    response.contentType("application/pdf")
    
    return response.send(pdf);
})

app.get("/create-contract",(request,response)=>{
    response.render("contrato");
})
app.post("/save-contract",(request,response)=>{
    const dataExtrato = request.body;
    cliente.push(dataExtrato);
    response.redirect("/contract");
})

app.get("/contract",(request,response)=>{
    const filePath = path.join(__dirname, "./print-contract.ejs");


    ejs.renderFile(filePath,{cliente},(err,html)=>{
            if(err){
                console.log(data)
                return response.send(err)
            }else{
                //Enviar para o navegador
                return  response.send(html); 
            }                         
        })
})

app.get("/create-ted",(request,response)=>{
    response.render("ted");
})

app.post("/save-ted",(request,response)=>{
    const dataTed = request.body
    ted.push(dataTed);
    response.redirect("/tedi")
})

app.get("/tedi",(request,response)=>{
    const filePath = path.join(__dirname, "./print-ted.ejs");


    ejs.renderFile(filePath,{ted},(err,html)=>{
            if(err){
                return response.send(err)
            }else{
                //Enviar para o navegador
                return  response.send(html); 
            }                         
        })
})

app.get("/",(request,response)=>{
    response.render("index")
})

const port  = process.env.PORT || 3001


app.listen(port);