module.exports=function(temp,info){
    let op=temp.replace(/{%PRODUCTNAME%}/g,info.productName);
   op=op.replace(/{%IMAGE%}/g,info.image);
   op=op.replace(/{%PRICE%}/g,info.price);
   op=op.replace(/{%FROM%}/g,info.from);
   op=op.replace(/{%NUTRIENTS%}/g,info.nutrients);
   op=op.replace(/{QUANTITY}/g,info.quantity);
   op=op.replace(/{%DESCRIPTION%}/g,info.description);
   op=op.replace(/{%ID%}/g,info.id);
   if(!info.organic){
      op=op.replace(/{%NOT_ORGANIC%}/g,'not-organic')
   }
   return op;
}