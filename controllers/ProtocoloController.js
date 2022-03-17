const express = require("express");
const router = express.Router();

router.get("/create-protocolo",(request,response)=>{
     response.render("comprovante-de-protocolo")
 })
 
router.post("/save-protocolo",(request,response)=>{
     const dataProtocolo = request.body;
     protocolo.push(dataProtocolo)
     response.redirect("/nprotocolo")
     //response.send(protocoloData)
 })
 
 router.get("/nprotocolo",(request,response)=>{
     const filePath = path.join(__dirname, "./print-protocolo.ejs");
     
 
     ejs.renderFile(filePath,{protocolo},(err,html)=>{
             if(err){
                 return response.send({msgErro:"erro antes do arquivo"})
                 console.log("ok")   
             }else{
                 //Enviar para o navegador
                 return  response.send(html); 
             }  
                                 
         })
 })
 
 router.get("/comprovante-de-protocolo", async(request,response)=>{

     const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
 
     const page = await browser.newPage();
 
     await page.goto("https://gerador-pdf.herokuapp.com/nprotocolo",{
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


module.exports = router;