const fs=require('fs');
const http=require('http');
const url=require('url');
const slugify=require('slugify');/** it is basically used to fillup space between two word console.log(slugify.(product name)) o/p:-product-name */
// var cors = require('cors');''
const replaceTemplate=require('./module/replacement');/* way to call import function from module* */
// ***************** file system*******************//



// sysnchronus way to read data
// fs.readFile('indexP1.txt','utf8',(err, data) => {
//     if (err) throw err;
    
//   });

// ********Synchronus way to writeFile
// fs.writeFileSync('indexP1.txt','getting difficulties');

// ****** both readFile & writeFile are asynchronus function
// fs.readFile('./txt/input.txt','utf-8',function(err,data){
//     fs.readFile('./txt/append.txt','utf-8',function(err,data1){
//         console.log(data1);
//         fs.writeFile("./txt/output.txt",data+"\n"+data1,function(err){
//             console.log("file written")
//         })
//     })
// })


// **************SERVER***************
const data=fs.readFileSync('./data.json','utf-8')
let parseddata=JSON.parse(data);
parseddata=parseddata.map(function(info){
  info.id=slugify(info.productName);
  return info;
});
// console.log(parseddata);
let overveiwData=fs.readFileSync("./1-node-farm/final/templates/template-overview.html",'utf-8');    
const templateCard=fs.readFileSync('./1-node-farm/final/templates/template-card.html','utf-8')
let templateProduct=fs.readFileSync('./1-node-farm/final/templates/template-product.html','utf-8')
// function replaceTemplate(temp,info){
//    let op=temp.replace(/{%PRODUCTNAME%}/g,info.productName);
//    op=op.replace(/{%IMAGE%}/g,info.image);
//    op=op.replace(/{%PRICE%}/g,info.price);
//    op=op.replace(/{%FROM%}/g,info.from);
//    op=op.replace(/{%NUTRIENTS%}/g,info.nutrients);
//    op=op.replace(/{QUANTITY}/g,info.quantity);
//    op=op.replace(/{%DESCRIPTION%}/g,info.description);
//    op=op.replace(/{%ID%}/g,info.id);
//    if(!info.organic){
//       op=op.replace(/{%NOT_ORGANIC%}/g,'not-organic')
//    }
//    return op;
// }
const server=http.createServer(function(req,res){
   //  const pathname=req.url;
   //  console.log(url);
    const {query,pathname}=url.parse(req.url,true);
    console.log(url.parse(req.url,true));
   
    
    if(pathname==='/api'){
       
      res.end(data)
      
    }else if(pathname==='/overview'){
      let card=parseddata.map(function(info){
         return replaceTemplate(templateCard,info);
      }).join(', ')
      
      overveiwData=overveiwData.replace(/{%PRODUCT_CARDS%}/g,card) 
      res.writeHead(200,{'Content-type':'text/html'});
      res.end(overveiwData);
    }else if(pathname=='/product'){
      let info=parseddata.filter(function(element){
        if(element.id==query.id){
          return element;
        }
      })
      res.writeHead(200,{'Content-type':'text/html'});
      let product=replaceTemplate(templateProduct,info[0]);
      res.end(product);
    }
    else{
      res.writeHead(404, {
         'Content-type': 'text/html',
         'my-own-header': 'hello-world'
       });
      res.end("welcome to server");
    }
    
 });
 server.listen(3000,'localhost',function(){
    console.log("listening to the server")
 });

