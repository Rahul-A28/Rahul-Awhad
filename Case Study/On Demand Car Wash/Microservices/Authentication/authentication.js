const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require('cors');
const Users = require('./models/Users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const dbURI = "mongodb+srv://rahul:qazxsw@project.y8odi.mongodb.net/ProjectUsers?retryWrites=true&w=majority";
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(function(result){
    app.listen(3001);console.log("Connected to DB\nListening from port: 3001")}).catch((err)=> console.log(err));


app.post("/login", async function(req,res){
    const email = req.body.email;
    const pass = req.body.password;
    // Users.findOne({email:email}).then(data=>res.json(data));
    // const result = Users.findOne({email:email}).then((data)=>{return data});
   const result = await Users.findOne({email:email});
    if(result){
        if(await bcrypt.compare(pass,result.password)){
            const token = await jwt.sign({email:result.email},"On Demand Car Wash",{expiresIn:"10m"});
            console.log("Correct Password and Email");
            res.json(token);
        }
        else{
            console.log("Invalid Password");
            res.status(400).json({message:"Invalid Password"});
        }
    }
    else{
        console.log("Invalid Email")
        res.status(400).json({message:"Invalid Email"});
    }
});

app.get('/verify', tokenVerify ,function(req,res){
    res.status(200).json(decodedToken.email);
    console.log(decodedToken);
});

var decodedToken = '';
async function tokenVerify(req,res,next){
    const token = req.query.token;
    await jwt.verify(token,"On Demand Car Wash",(err,tokenData)=>{
        if(err){
            console.log(err);
            res.status(400).json({message:"Invalid Token"});
        }
        if(tokenData){
            decodedToken = tokenData;
            next();
        }
    })
}


