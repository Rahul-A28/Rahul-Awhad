const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require('cors');
const Users = require('./models/Users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info:{
            "title": "Authentication Microservice",
            "description": "Contains Api routes for Authentication Microservice.",
            
            "contact": {
                "name": "Rahul",
                
            },
            servers:['http://localhost:3001']
        }
    },
    apis: ["authentication.js"]
}

const app = express();

app.use(bodyParser.json());
app.use(cors());

const dbURI = "mongodb+srv://<Mongo database username>:<password>@project.y8odi.mongodb.net/ProjectUsers?retryWrites=true&w=majority";
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(function(result){
    app.listen(3001);console.log("Connected to DB\nListening from port: 3001")}).catch((err)=> console.log(err));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * paths:
 *  /login:
 *   post:
 *    description: To check the email and password in the database and to send jwt token to the client.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Login
 *        description: pass required fields
 *        schema:
 *          type: object
 *          properties:
 *              custId:
 *                  type:string    
 *              custName:
 *                  type:string  
 *        example:
 *              {"email":"b@b.com",
 *               "password":"12345"}
 *       
 *    responses:
 *      '200':
 *          description: jwt token sent Successfully !   
 */
app.post("/login", async function(req,res){
    const email = req.body.email;
    const pass = req.body.password;
    
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


/**
 * @swagger
 * paths:
 *  /verify:
 *   get:
 *    description: To verfy the jwt token.
 *    parameters:
 *       - in: query
 *         name: token
 *         type: string
 *         required: true
 *         description: token to check  
 *        
 *       
 *    responses:
 *      '200':
 *          description: jwt token verified Successfully !   
 */
app.get('/verify', tokenVerify ,function(req,res){
    res.status(200).json(decodedToken.email);
    console.log(decodedToken);
});

var decodedToken = '';
async function tokenVerify(req,res,next){
    
    const token = req.query.token;
    console.log(token);
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

module.exports = app;

