"use strict";


//?------#- IMPORTS -#------
require('dotenv').config();
require('express-async-errors');
const cors = require('cors')

//?------#- EXPRESS -#------
const express = require('express');
const app = express();

//?------#- DB CONNECTION -#------
require('./src/config/dbConnection')();

//?------#- MIDDLEWARES -#------
app.use(express.json());
app.use(cors({origin:'https://tutortodo-app-frontend.vercel.app'}));


//?------#- ROUTES -#------
app.all('/',(req,res)=>{
    res.send({
        error:false,
        message : "Welcome to the todo backedn api!"
    })
})

app.use('/todos',require('./src/router/todoRouter'))


//?------#- ERROR HANDLER -#------
app.use(require('./src/middlewares/errorHandler'));

//?------#- PORT LISTEN -#------
const PORT = process.env.PORT || 2000; 
// const PORT =  1000;
app.listen(PORT,()=>console.log("Server is running on "+PORT));