const express = require('express');
const PORT = 5000;
const expressLayouts= require('express-ejs-layouts');

const app= express();
const db= require('./config/keys').MongoURI;

mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true });


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//BodyParser
app.use(express.urlencoded({extended:false}));

//Accessing Routes
app.use('/', require('./routes/index'));
app.use('/users',require('./routes/users'));




app.get('/', (req,res)=>
{
    res.send("hello");
})


app.listen(PORT, ()=>
{
    console.log("Server Started");
});


