var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { json } = require('body-parser');

app.use(bodyParser.json());

var items = [];

app.get("/inventory", function(req,res){
    res.json(items);
});

app.post("/inventory", function(req,res){
    var item = req.body;
    items.push(item);
    console.log(req.body);
    res.send("Added Successfully: "+items);
    // res.json(item);
});

app.get("/inventory/:id", function(req,res){
    var id = req.params.id;
    var found = false;
    var temp = {};
    for(var item of items){
        if(item.name==id){
            found = true;
            temp = item;
        }
    }
    if(found){
        res.json(temp);
    }
    else{
        res.send("Cannot find the specified item name");
    }
});

app.delete("/inventory/:id", function(req,res){
    // console.log("In delete block");
    var found = false;
    for(var i=0;i<items.length;i++){
        if(items[i].name==req.params.id){
            found = true;
            items.splice(i,i+1);
        }
    }
    if(found){
        res.send("Item removed successfully");
    }
    else{
        res.send("Cannot find the specified item name");
    }
});

app.delete("/inventory", function(req,res){
    // console.log("In delete block");
    items = [];
    res.send("Deleted the Inventory");
});

app.put("/inventory/:id", function(req,res){
    var found = false;
    for(var i=0;i<items.length;i++){
        if(items[i].name==req.params.id){
            found = true;
            items[i] = req.body;
            break;
        }
    }
    if(found){
        res.send("Item modified successfully successfully");
    }
    else{
        res.send("Cannot find the specified Item Name");
    }
});

app.put("/inventory", function(req,res){
    
    items = req.body;
    res.send("Updated entire Inventory");
    

});

app.listen(3000, function(){
    console.log("Listening from port 3000");
});

