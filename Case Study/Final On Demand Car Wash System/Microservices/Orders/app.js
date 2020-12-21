const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Orders = require('./models/Orders');
const cors = require('cors');
const multer = require('multer');
const Razorpay = require('razorpay');
const easyinvoice = require('easyinvoice');
const nodemailer = require('nodemailer');
const fs = require('fs');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info:{
            "title": "Orders Microservice",
            "description": "Contains Api routes for Order Microservice.",
            
            "contact": {
                "name": "Rahul",
                
            },
            servers:['http://localhost:3002']
        }
    },
    apis: ["app.js"]
}



const instance = new Razorpay({
    key_id:"<RazorPay Key Id>",
    key_secret: "<RazorPay Secret Key>"
})


const app = express();
const upload = multer();
// Middlewares
app.use(bodyParser.json());

app.use(cors());


mongoose.set('useFindAndModify', false);

const dbURI = "mongodb+srv://<Mongo database username>:<password>@project.y8odi.mongodb.net/Orders?retryWrites=true&w=majority";
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(function(result){
    app.listen(3002);console.log("Connected to DB\nListening from port: 3002")}).catch((err)=> console.log(err));
    

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * paths:
 *  /razorPayOrder:
 *   post:
 *    description: To send RazorPayer order id to the client
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: amount
 *        description: Pass amount*100.
 *        schema:
 *          type: object
 *          required:
 *              - userName
 *          properties:
 *              amount:
 *                  type: number
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string    
 *    responses:
 *      '200':
 *          description: Order Id sent Successfully !   
 */


app.post('/razorPayOrder',function(req,res,next){
    const options = {
        amount: (req.body.amount)*100,
        currency:"INR",
    };
    console.log("Amount: "+options.amount);
    console.log(req.body.orderData);
    instance.orders.create(options, (err,order)=>{
        if(err){
            //console.log(err);
            res.status(404);
            next(err);
            
        }
        if(order){
            console.log("SuccessFull");
            res.json({success:true, status:"Order created Successfully", value:order, key:"<RazorPay Key Id>",orderData:req.body.orderData});
        }
    })
});



/**
 * @swagger
 * paths:
 *  /newOrder:
 *   post:
 *    description: To store a new order
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: new order
 *        description: pass required fields
 *        schema:
 *          type: object
 *          properties:
 *              custId:
 *                  type:string    
 *              custName:
 *                  type:string  
 *              carName:
 *                  type:string  
 *              carLocation:
 *                  type:string  
 *              carPlateNo:
 *                  type:string  
 *              custPhoneNo:
 *                  type:number
 *              packageName:
 *                  type:string  
 *              packagePrice:
 *                  type:number
 *          example:
 *              {"custId":"a@a.com",
 *              "custName":"Abhay",
 *              "carName":"Mahindra",
 *              "carLocation":"Mumbai",
 *              "carPlateNo":"MHXXXX",
 *              "custPhoneNo":"878976898",
 *              "packageName":"Deluxe",
 *              "packagePrice":"700"}
 *       
 *    responses:
 *      '200':
 *          description: Order Id sent Successfully !   
 */

// Creates New Order and sets only custFields of the Schema, receives cust Email, cust name(fname+lastname), car location, car plate no,, cust phone
app.post('/newOrder',function(req,res){
    const order = new Orders(req.body);
    order.save().then((result)=>{res.status(200).json(result);console.log(result)}).catch((err)=>console.log(err));
});


/**
 * @swagger
 * paths:
 *  /order:
 *   post:
 *    description: To get a order based on order id
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: get a order
 *        description: pass required fields
 *        schema:
 *          type: object
 *          properties:
 *              _id:
 *                  type:string    
 *              
 *          example:
 *              {"_id":"5fd628fd9804ca0ba4a50dd7"}
 *       
 *    responses:
 *      '200':
 *          description: Order Id sent Successfully !   
 */
// Returns One Specific Order based on Order id, Receives only Order Id.
app.post('/order',async function(req,res){
    const orderId = req.body._id;
    console.log(orderId);
    const data = await Orders.findOne({_id:orderId}).then(result=>{res.status(200).json(result)},error=>res.status(400).json({message:"Order not Found"}));
    
});


/**
 * @swagger
 * paths:
 *  /acceptOrder:
 *   post:
 *    description: When a washer accepts a order
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: modifies a order
 *        description: pass required fields
 *        schema:
 *          type: object
 *          properties:
 *              _id:
 *                  type:string    
 *              
 *          example:
 *              {"orderId":"5fd628fd9804ca0ba4a50dd7",
 *               "email":"b@b.com",
 *               "name":"Viraj",
 *               "phone":"8967889687",
 *               "isAcceptedDate":"12-12-2020 12:00:00"        
 *              }
 *       
 *    responses:
 *      '200':
 *          description: Order Id sent Successfully !   
 */
// Accepts a sepcific order id and set the is isAccpeted and washer details in the document, receives order id and washer details.
app.post('/acceptOrder',function(req,res){
    const orderId = req.body.orderId;
    const washerId = req.body.email;
    const washerName = req.body.name;
    const washerPhone = req.body.phone;
    const isAccepted  = true;
    const isAcceptedDate = req.body.isAcceptedDate;
    
    console.log(req.body);

   

    Orders.findOneAndUpdate({_id:orderId},{$set:{washerId:washerId,washerName:washerName,washerPhone:washerPhone,isAccepted:isAccepted,isAcceptedDate:isAcceptedDate}})
    .then((result)=>{console.log("Accepted the Order");res.status(200).send(result)},(err=>res.send(err)));
});

/**
 * @swagger
 * paths:
 *  /startCleaning:
 *   post:
 *    description: When a washer starts cleaning
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: modifies a order
 *        description: pass required fields
 *        schema:
 *          type: object
 *          properties:
 *              _id:
 *                  type:string    
 *              
 *          example:
 *              {"orderId":"5fd628fd9804ca0ba4a50dd7"           
 *              }
 *       
 *    responses:
 *      '200':
 *          description: Order Id sent Successfully !   
 */
//Accepts a specific order id and sets inProgress as true.
app.post('/startCleaning',function(req,res){
    const orderId = req.body.orderId;
    
    
    

    Orders.findOneAndUpdate({_id:orderId},{$set:{inProgress:true}})
    .then((result)=>{console.log("Started Cleaning");res.send(result)},(err=>res.send(err)));
});


/**
 * @swagger
 * paths:
 *  /finishCleaning:
 *   post:
 *    description: When a washer completes cleaning
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: modifies a order
 *        description: pass required fields
 *        schema:
 *          type: object
 *          properties:
 *              _id:
 *                  type:string    
 *              
 *          example:
 *              {"orderId":"5fd628fd9804ca0ba4a50dd7",
 *               "custId":"a@a.com"   
 *              }
 *       
 *    responses:
 *      '200':
 *          description: Order Id sent Successfully !   
 */
//Accepts a specific order id and sets isCompleted as true.
app.post('/finishCleaning',function(req,res){
    const orderId = req.body.orderId;
    const isCompleteDate = req.body.isCompleteDate;
    
    

    Orders.findOneAndUpdate({_id:orderId},{$set:{isComplete:true,inProgress:false,isCompleteDate:isCompleteDate}})
    .then((result)=>{

        let pdfData = "";

        var data = {
            //"documentTitle": "RECEIPT", //Defaults to INVOICE
            "currency": "INR",
            "taxNotation": "gst", //or gst
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
            //"logoExtension": "png", //only when logo is base64
            "sender": {
                "company": "On Demand Car Wash System",
                "address": "Sample Street 123",
                "zip": "1234 AB",
                "city": "Sampletown",
                "country": "Samplecountry"
                
            },
            "client": {
                   "company": result.custName,
                   "address": result.carLocation,
                   "zip": "Car Name: "+result.carName,
                   "city": "Email: "+result.custId,
                   "country": "Phone: "+result.custPhoneNo,
                
            },
            "invoiceNumber": result._id,
            "invoiceDate": new Date().toLocaleString('en-US'),
            "products": [
                {
                    "quantity": "1",
                    "description": "Car Wash Package: " + result.packageName,
                    "tax": 6,
                    "price": result.packagePrice
                },
                
            ],
            "bottomNotice": "Thank You For Using On Demand Car Wash Services."
        };
    
        easyinvoice.createInvoice(data, async function (result) {
            //The response will contain a base64 encoded PDF file
            pdfData = result.pdf;
            // console.log(result.pdf);
            await fs.writeFileSync("receipt.pdf", result.pdf, 'base64');

            const transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user:'<gmail user id>',
                    pass: '<password>'
                }
            });
    
            const mailOptions = {
                from:'<gmail user id>',
                to:req.body.custId,
                subject: "Wash Order Receipt",
                text: "Receipt is attached at the mail. If not found contact admin.",
                attachments: [{
                    filename:"receipt.pdf",
                    path:"./receipt.pdf"
                }]
            }
    
            transporter.sendMail(mailOptions, function(err,data){
                if(err){
                    console.log(req.body.custId);
                    console.log(err);
                }
                else{
                    console.log("Email Sent !!!!");
                }
            });

        });

     
        console.log("Finished Cleaning");
        res.json(result);
    
    },(err=>res.send(err)));

    res.json({message:"Success Marking CLean"});

});


app.post('/myOrders', function(req,res){
    const email = req.body.email;
    const myOrders = Orders.find({custId:email}).then((data)=>{res.json(data)},(err)=>{res.json({message:"Email Not Found"})});
    
});
app.post('/washerOrders', function(req,res){
    const email = req.body.email;
    const myOrders = Orders.find({washerId:email}).then((data)=>{res.json(data)},(err)=>{res.json({message:"Email Not Found"})});
    
});

app.post('/washerOrders', function(req,res){
    const email = req.body.email;
    const myOrders = Orders.find({washerId:email}).then((data)=>{res.json(data)},(err)=>{res.json({message:"Email Not Found"})});
    
});

app.get('/getAvailableOrders', function(req,res){
    Orders.find({isAccepted:false}).then((data)=>res.json(data),(err)=>res.json({message:"Something Went Wrong"}));
});

/**
 * @swagger
 * paths:
 *  /washerAvailableOrders:
 *   post:
 *    description: Orders which are near to a washer
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: modifies a order
 *        description: pass required fields
 *        schema:
 *          type: object
 *          properties:
 *              _id:
 *                  type:string    
 *              
 *          example:
 *              {"lat":12.4354326,
*                "lng":67.4554345  
 *              }
 *       
 *    responses:
 *      '200':
 *          description: Order Id sent Successfully !   
 */
app.post('/washerAvailableOrders', function(req,res){
    console.log("Lat:"+req.body.lat+" Lng:"+req.body.lng);
    Orders.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [ req.body.lat , req.body.lng ] },
                
                distanceField: "dist.calculated",
                maxDistance:50000,
                includeLocs: "dist.location",
                
                // spherical:true
             },
        },
        {
            $match:{isAccepted:false}
        }
        
    ]).then(data=>{res.json(data);console.log(data)},err=>{res.json(err);console.log(err)});
});

app.get('/getAllOrders',function(req,res){
    console.log("Get All Orders Request");
    Orders.find().then((data)=>res.json(data),err=>res.json({message:"Something went wrong"}));
});

module.exports = app;
