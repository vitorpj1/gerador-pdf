const fs = require('fs');
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
        ag:"1",
        conta:"1",
        banco:"Nubank",
        vencimento:"1",
        nParcelas:"1",
        horario: "1",
        dia:"1"
    }
        
]

router.get("/create-contract",(request,response)=>{
    /* fs.readFile('./bancos.txt', 'utf-8', function (err, data) {
        if(err) throw err;
        let bancos = new Array();
        let separados = data.split(",");
        for (let i = 0; i < separados.length; i++){
            bancos.push(separados[i]);
        }
        response.render("contrato",{bancos:bancos})
    }) */

    response.render("contrato");
 })
 router.post("/save-contract",(request,response)=>{
     const dataExtrato = request.body;
     cliente.push(dataExtrato);
     response.redirect("/contract");
 })
 
 router.get("/contract",(request,response)=>{
     const filePath = path.join(__dirname, "../src/print-contract.ejs");
 
    
     ejs.renderFile(filePath,{cliente},(err,html)=>{
             if(err){
                 return response.send(err)
             }else{
                 //Enviar para o navegador
                 return  response.send(html); 
             }                         
         })
 })
 
 router.get("/contrato", async(request,response)=>{
    var hostname = request.headers.host;


     const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
 
     const page = await browser.newPage();
     
    if(hostname == "localhost:3001"){
        await page.goto("http://localhost:3001/contract",{
            waitUntil:['domcontentloaded', 'networkidle0']
     })
    }else{
    await page.goto("https://gerador-pdf.herokuapp.com/contract",{
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