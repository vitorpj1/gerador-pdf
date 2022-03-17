const express = require("express");
const router = express.Router();

router.get("/create-contract",(request,response)=>{
     response.render("contrato");
 })
 router.post("/save-contract",(request,response)=>{
     const dataExtrato = request.body;
     cliente.push(dataExtrato);
     response.redirect("/contract");
 })
 
 router.get("/contract",(request,response)=>{
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
 
 router.get("/contrato", async(request,response)=>{
 
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

module.exports = router;