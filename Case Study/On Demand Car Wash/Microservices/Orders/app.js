const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Orders = require('./models/Orders');
const cors = require('cors');
const multer = require('multer');
const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id:"rzp_test_3p10bJuUWamexA",
    key_secret: "4X4dYEV63BzOKAPGnK9oKkaJ"
})




const app = express();
const upload = multer();
// Middlewares
app.use(bodyParser.json());
// app.use(bodyParser.json({limit: '2mb'}));
// app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
app.use(cors());


mongoose.set('useFindAndModify', false);

const dbURI = "mongodb+srv://rahul:qazxsw@project.y8odi.mongodb.net/Orders?retryWrites=true&w=majority";
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(function(result){
    app.listen(3002);console.log("Connected to DB\nListening from port: 3002")}).catch((err)=> console.log(err));
    


app.post('/razorPayOrder',function(req,res,next){
    const options = {
        amount: (req.body.amount)*100,
        currency:"INR",
    };
    console.log("Amount: "+options.amount);
    instance.orders.create(options, (err,order)=>{
        if(err){
            console.log(err);
            next(err);
        }
        if(order){
            res.json({success:true, status:"Order created Successfully", value:order, key:"rzp_test_3p10bJuUWamexA",orderData:req.body.orderData});
        }
    })
});



// Creates New Order and sets only custFields of the Schema, receives cust Email, cust name(fname+lastname), car location, car plate no,, cust phone
app.post('/newOrder',function(req,res){
    const order = new Orders(req.body);
    order.save().then((result)=>{res.send(result);console.log(result)}).catch((err)=>console.log(err));
});


// Returns One Specific Order based on Order id, Receives only Order Id.
app.post('/order',async function(req,res){
    const orderId = req.body._id;
    console.log(orderId);
    const data = await Orders.findOne({_id:orderId}).then(result=>{res.status(200).json(result)},error=>res.status(400).json({message:"Order not Found"}));
    //console.log(data);
    // if(data){
    //     res.status(200).json(data);
    // }
    // else{
    //     res.status(400).json({message:"Order Not Found"});
    // }
});


// Accepts a sepcific order id and set the is isAccpeted and washer details in the document, receives order id and washer details.
app.post('/acceptOrder',function(req,res){
    const orderId = req.body.orderId;
    const washerId = req.body.email;
    const washerName = req.body.name;
    const washerPhone = req.body.phone;
    const isAccepted  = true;
    const isAcceptedDate = req.body.isAcceptedDate;
    
    console.log(req.body);

    // Also Add the notifications logic in below subscribe part

    Orders.findOneAndUpdate({_id:orderId},{$set:{washerId:washerId,washerName:washerName,washerPhone:washerPhone,isAccepted:isAccepted,isAcceptedDate:isAcceptedDate}})
    .then((result)=>{console.log("Accepted the Order");res.send(result)},(err=>res.send(err)));
});


//Accepts a specific order id and sets inProgress as true.
app.post('/startCleaning',function(req,res){
    const orderId = req.body.orderId;
    
    
    // console.log(req.body);

    // Also Add the notifications logic in below subscribe part

    Orders.findOneAndUpdate({_id:orderId},{$set:{inProgress:true}})
    .then((result)=>{console.log("Started Cleaning");res.send(result)},(err=>res.send(err)));
});

//Accepts a specific order id and sets isCompleted as true.
app.post('/finishCleaning',function(req,res){
    const orderId = req.body.orderId;
    const isCompleteDate = req.body.isCompleteDate;
    
    // console.log(req.body);

    // Also Add the notifications logic in below subscribe part

    Orders.findOneAndUpdate({_id:orderId},{$set:{isComplete:true,inProgress:false,isCompleteDate:isCompleteDate}})
    .then((result)=>{console.log("Finished Cleaning");res.send(result)},(err=>res.send(err)));
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

app.get('/getAllOrders',function(req,res){
    console.log("Get All Orders Request");
    Orders.find().then((data)=>res.json(data),err=>res.json({message:"Something went wrong"}));
});


//app.listen(3000); Shifted inside mongoose.connect