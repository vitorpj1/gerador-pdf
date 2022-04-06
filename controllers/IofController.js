const express = require("express");
const app = express();
const router = express.Router();
const path = require("path")
const ejs = require("ejs");
const puppeteer = require("puppeteer");
app.set("view engine","ejs");

const iof = [
    {
        nome:"teste",
        valor:"1",
        cpf:"1",
        iof:"1"
    }
        
]

router.get("/create-iof",(request,response)=>{
     response.render("comunicado-da-receita-federal");
 })
 router.post("/save-iof",(request,response)=>{
     const dataIof = request.body;
     iof.push(dataIof);
     response.redirect("/iof");
 })
 
 router.get("/iof",(request,response)=>{
     const filePath = path.join(__dirname, "../src/print-iof.ejs");
 
    
     ejs.renderFile(filePath,{iof},(err,html)=>{
             if(err){
                 return response.send(err)
             }else{
                 //Enviar para o navegador
                 return  response.send(html); 
             }                         
         })
 })
 
 router.get("/comunicado-da-receita-federal", async(request,response)=>{
    var hostname = request.headers.host;
        /* const browser = await puppeteer.launch({ args: ['--no-sandbox'] }); */
 
     const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
 
     const page = await browser.newPage();

     /* await page.goto("https://gerador-pdf.herokuapp.com/contract",{
         waitUntil:"networkidle0"
     }) */
 
     if(hostname == "localhost:3001"){
        await page.goto("http://localhost:3001/iof",{
            waitUntil:['domcontentloaded', 'networkidle0']
     })
    }else{
    await page.goto("https://gerador-pdf.herokuapp.com/iof",{
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