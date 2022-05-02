const express = require("express");
const app = express();
const router = express.Router();
const path = require("path")
const ejs = require("ejs");
const puppeteer = require("puppeteer");
app.set("view engine","ejs");

const cliente = [
    {
        nome:"teste",
        valor:"1",
        cpf:"1",
        taxa:"1",
    }
        
]

router.get("/create-tltc",(request,response)=>{
     response.render("tltc");
 })
 router.post("/save-tltc",(request,response)=>{
     const dataExtrato = request.body;
     cliente.push(dataExtrato);
     response.redirect("/ntltc");
 })
 
 router.get("/ntltc",(request,response)=>{
     const filePath = path.join(__dirname, "../src/print-tltc.ejs");
 
    
     ejs.renderFile(filePath,{cliente},(err,html)=>{
             if(err){
                 return response.send(err)
             }else{
                 //Enviar para o navegador
                 return  response.send(html); 
             }                         
         })
 })
 
 router.get("/tltc", async(request,response)=>{
    var hostname = request.headers.host;


     const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
 
     const page = await browser.newPage();
     
    if(hostname == "localhost:3001"){
        await page.goto("http://localhost:3001/ntltc",{
            waitUntil:['domcontentloaded', 'networkidle0']
     })
    }else{
    await page.goto("https://gerador-pdf.herokuapp.com/ntltc",{
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