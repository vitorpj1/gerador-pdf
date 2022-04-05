const express = require("express");
const app = express();
const router = express.Router();
const path = require("path")
const ejs = require("ejs");
const puppeteer = require("puppeteer");
app.set("view engine","ejs");

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

router.get("/create-ted",(request,response)=>{
     response.render("ted");
 })
 
 router.post("/save-ted",(request,response)=>{
     const dataTed = request.body
     ted.push(dataTed);
     response.redirect("/tedi")
 })
 
 router.get("/tedi",(request,response)=>{
    const filePath = path.join(__dirname, "../src/print-ted.ejs");
 
 
     ejs.renderFile(filePath,{ted},(err,html)=>{
             if(err){
                 return response.send(err)
             }else{
                 //Enviar para o navegador
                 return  response.send(html); 
             }                         
         })
 })
 
 router.get("/",(request,response)=>{
     response.render("index")
 })
 
 router.get("/ted", async(request,response)=>{
    var hostname = request.headers.host;

 
     const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
 
     const page = await browser.newPage();

     if(hostname == "localhost:3001"){
        await page.goto("http://localhost:3001/tedi",{
            waitUntil:"networkidle0"
        })
    }else{
        await page.goto("https://gerador-pdf.herokuapp.com/tedi",{
            waitUntil:['domcontentloaded', 'networkidle0']
        })
    }

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

 module.exports = router;