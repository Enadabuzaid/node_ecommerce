const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongos = require('mongoose');

dotenv.config({path : "config.env"});

// connect database 
mongos.connect(process.env.DB_URI).then((conn) => {
    console.log(`Database Connected : ${conn.connection.host}`);
}).catch((err) => {
    console.log(`Database error : ${err}` );
    process.exit(1);
});

// express app
const app = new express();

// Middlewares
app.use(express.json());

if(process.env.NODE_ENV === 'devlopment'){
    app.use(morgan('dev'));
    console.log(`mode ${process.env.NODE_ENV}`);
}

// 1- create Schema
const categorySchema = new mongos.Schema({
    name : String,
});

// 2- create Model 
const CategoryModal = new mongos.model('Category' , categorySchema)

// Routes
app.post('/',(req,res) => {
    const name = req.body.name;
    console.log(req.body);

    const newCategory = new CategoryModal({name});
    newCategory.save().then((doc) => {
        res.json(doc);
    }).catch((err) => {
        res.json(err);
    });
});

app.get('/',(req,res) => {
 res.send('our API');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`App Running on port ${PORT}`);
})