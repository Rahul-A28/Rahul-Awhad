var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var items = [];

app.get("/items", function(req,res){
    // for(var item of items){
    //     res.json(item);
    //     //console.log(item);
    // }
    res.json(items);
});

app.post("/items", function(req,res){
    var item = req.body;
    items.push(item);
    console.log(req.body);
    res.send("Added Successfully");
    // res.json(item);
});

app.get("/items/:id", function(req,res){
    var id = req.params.id;
    var found = false;
    var temp = {};
    for(var item of items){
        if(item._id==id){
            found = true;
            temp = item;
        }
    }
    if(found){
        res.json(temp);
    }
    else{
        res.send("Cannot find the specified id");
    }
});

app.delete("/items/:id", function(req,res){
    console.log("In delete block");
    var found = false;
    for(var i=0;i<items.length;i++){
        if(items[i]._id==req.params.id){
            found = true;
            items.splice(i,i+1);
        }
    }
    if(found){
        res.send("Item removed successfully");
    }
    else{
        res.send("Cannot find the specified id");
    }
});

app.patch("/items/:id", function(req,res){
    var found = false;
    for(var i=0;i<items.length;i++){
        if(items[i]._id==req.params.id){
            found = true;
            items[i] = req.body;
            break;
        }
    }
    if(found){
        res.send("Item modified successfully successfully");
    }
    else{
        res.send("Cannot find the specified id");
    }
});

app.listen(3000, function(){
    console.log("Listening from port 3000");
});