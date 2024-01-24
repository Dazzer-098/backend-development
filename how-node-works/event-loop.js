const fs=require('fs');
setTimeout(function(){
    console.log("timer 1 finished");
},0);
setImmediate(function(){
    console.log("immediate 1 called");
})

fs.readFile('test-event.txt',function(){
    console.log("file read");
    // setTimeout(function(){
    //     console.log("timer 2 finished");
    // },0);
    // setTimeout(function(){
    //     console.log("timer 3 finished");
    // },3000);
    // setImmediate(function(){
    //     console.log("immediate 2 called");
    // })
})
