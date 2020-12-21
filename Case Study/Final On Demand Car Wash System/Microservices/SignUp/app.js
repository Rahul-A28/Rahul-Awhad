const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./models/Users');
const cors = require('cors');
const multer = require('multer');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info:{
            "title": "Users Microservice",
            "description": "Contains Api routes for Users Microservice.",
            
            "contact": {
                "name": "Rahul",
                
            },
            servers:['http://localhost:3000']
        }
    },
    apis: ["app.js"]
}

const app = express();
const upload = multer();
// Middlewares
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
app.use(cors());


mongoose.set('useFindAndModify', false);

const dbURI = "mongodb+srv://<Mongo database username>:<password>@project.y8odi.mongodb.net/ProjectUsers?retryWrites=true&w=majority";
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(function(result){
    app.listen(3000);console.log("Connected to DB\nListening from port: 3000")}).catch((err)=> console.log(err));
    

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * @swagger
 * paths:
 *  /register:
 *   post:
 *    description: To store a new user
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: new user
 *        description: pass required fields
 *        schema:
 *          type: object
 *          properties:
 *              firstName:
 *                  type:string    
 *              lastName:
 *                  type:string  
 *              dob:
 *                  type:string  
 *              email:
 *                  type:string  
 *              phone:
 *                  type:string  
 *              type:
 *                  type:number
 *              password:
 *                  type:string  
 *              state:
 *                  type:string
 *              city:
 *                  type:string  
 *              street:
 *                  type:string
 *          example:
 *              {"firstName":"Swagger",
 *               "lastName":"Swagger",
 *               "dob":"22/02/87",
 *               "email":"swagger@g.com",
 *               "phone":"687898",
 *               "type":"Customer",   
 *               "password":"1234",
 *               "state":"Maharashtra",
 *               "city":"Mumbai",
 *               "street":"MR Road"            
 *              }
 *       
 *    responses:
 *      '200':
 *          description: User created Successfully !   
 */
app.post('/register',function(req,res){
    const user = new Users(req.body);
    user.save().then((result)=>res.send(result)).catch((err)=>console.log(err));
});


// To get a user based on email id
/**
 * @swagger
 * paths:
 *  /user:
 *   post:
 *    description: To find a user based on email id
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: find user
 *        description: pass required fields
 *        schema:
 *          type: object
 *          properties:
 *              email:
 *                  type:string    
 *          example:
 *              {"email":"swagger@g.com"}
 *       
 *    responses:
 *      '200':
 *          description: User found !   
 */
app.post('/user',async function(req,res){
    const email = req.body.email;
    console.log(email);
    const data = await Users.findOne({email:email}).then(result=>{return result});
    //console.log(data);
    if(data){
        res.status(200).json(data);
    }
    else{
        res.status(400).json({message:"User Not Found"});
    }
});


app.post('/addPhoto', upload.array(),function(req,res){
    const email = req.body.email;
    const img = req.body.profileImg;
    
    // console.log(req.body);
    Users.findOneAndUpdate({email:email},{$set:{profileImg:img}})
    .then((result)=>{console.log("Updated the Image");res.send(result)},(err=>res.send(err)));
});

// To get all customers
/**
 * @swagger
 * paths:
 *  /viewAllCustomers:
 *   get:
 *    description: To get all customers
 *    consumes:
 *      - application/json
 *    
 *    responses:
 *      '200':
 *          description: All customers !   
 */
app.get('/viewAllCustomers', function(req,res){
    Users.find({type:"Customer"}).then(data=>res.json(data),err=>res.json(err));
});

// To get all washers
/**
 * @swagger
 * paths:
 *  /viewAllWashers:
 *   get:
 *    description: To get all washers
 *    consumes:
 *      - application/json
 *    
 *    responses:
 *      '200':
 *          description: All washers !   
 */
app.get('/viewAllWashers', function(req,res){
    Users.find({type:"Washer"}).then(data=>res.json(data),err=>res.json(err));
});

// To update a user based on email id
/**
 * @swagger
 * paths:
 *  /saveProfile:
 *   post:
 *    description: To update a user based on email id
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: update user
 *        description: pass required fields
 *        schema:
 *          type: object
 *          properties:
 *              email:
 *                  type:string    
 *          example:
 *              {"firstName":"Swagger",
 *               "lastName":"Swagger",
 *               "dob":"22/02/87",
 *               "email":"swagger@g.com",
 *               "phone":"687898"                        
 *              }
 *       
 *    responses:
 *      '200':
 *          description: User Updated !   
 */
app.post('/saveProfile', function(req,res){
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = req.body.dob;
    const phone = req.body.phone;
    const email = req.body.email;
    Users.findOneAndUpdate({email:email},{$set:{firstName:firstName,lastName:lastName,dob:dob,phone:phone}}).then(data=>res.json({message:"Updated Successfully"}),err=>{res.json({message:"Not Updated"});console.log(err)});
});


//update latitute and longitude of a user
/**
 * @swagger
 * paths:
 *  /updateCords:
 *   post:
 *    description: To update a lat and lng of a user
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: update user
 *        description: pass required fields
 *        schema:
 *          type: object
 *          properties:
 *              email:
 *                  type:string
 *              geometry:
 *                  type:object 
 *          example:
 *              {"email":"swagger@g.com",
 *               "geometry": {"type":"point", "coordinates":["16.0","17.0"]}                    
 *              }
 *       
 *    responses:
 *      '200':
 *          description: User Updated !   
 */
app.post('/updateCords', function(req,res){
    const email = req.body.email;
    const geometry = req.body.geometry;
    Users.findOneAndUpdate({email:email},{$set:{geometry:geometry}}).then(data=>res.json(data),err=>res.json({message:"Failed to Update the Cordinates"}));
});




module.exports = app;