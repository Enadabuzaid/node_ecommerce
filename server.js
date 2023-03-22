const express = require("express");

const app = new express();

app.get('/',(req,res) => {
 res.send('our API');
});

app.listen(8000,()=>{
    console.log('App Running');
})