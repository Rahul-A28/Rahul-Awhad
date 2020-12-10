const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./models/Users');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer();
// Middlewares
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
app.use(cors());


mongoose.set('useFindAndModify', false);

const dbURI = "mongodb+srv://rahul:qazxsw@project.y8odi.mongodb.net/ProjectUsers?retryWrites=true&w=majority";
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(function(result){
    app.listen(3000);console.log("Connected to DB\nListening from port: 3000")}).catch((err)=> console.log(err));
    




app.post('/register',function(req,res){
    const user = new Users(req.body);
    user.save().then((result)=>res.send(result)).catch((err)=>console.log(err));
});

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

app.get('/viewAllCustomers', function(req,res){
    Users.find({type:"Customer"}).then(data=>res.json(data),err=>res.json(err));
});

app.get('/viewAllWashers', function(req,res){
    Users.find({type:"Washer"}).then(data=>res.json(data),err=>res.json(err));
});

app.post('/saveProfile', function(req,res){
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = req.body.dob;
    const phone = req.body.phone;
    const email = req.body.email;
    Users.findOneAndUpdate({email:email},{$set:{firstName:firstName,lastName:lastName,dob:dob,phone:phone}}).then(data=>res.json({message:"Updated Successfully"}),err=>{res.json({message:"Not Updated"});console.log(err)});
});



//app.listen(3000); Shifted inside mongoose.connect