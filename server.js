const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({path : "config.env"});

const app = new express();
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'devlopment'){
    app.use(morgan('dev'));
    console.log(`mode ${process.env.NODE_ENV}`);
}


app.get('/',(req,res) => {
 res.send('our API');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`App Running on port ${PORT}`);
})