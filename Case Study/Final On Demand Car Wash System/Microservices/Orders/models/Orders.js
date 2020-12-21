// const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
    type:{
        type:String,
        default:"Point"
    },
    coordinates:{
        type:[Number],
        index:"2dsphere",
        required:true
    }
});

const OrdersSchema = new Schema({
    custId:{type:String,required:true},
    custName:{type:String,required:true},
    carName:{type:String,required:true},
    carLocation:{type:String,required:true},
    carPlateNo:{type:String,required:true},
    custPhoneNo:{type:Number,required:true},
    washerPhone:{type:Number, default:null},
    washerId:{type:String,default:null},
    washerName:{type:String,default:null},
    isAccepted:{type:Boolean,default:false},
    inProgress:{type:Boolean,default:false},
    isComplete:{type:Boolean,default:false},
    packageName:{type:String,required:true},
    packagePrice:{type:Number,required:true},
    orderPosted:{type:String,default:null},
    isAcceptedDate:{type:String,default:null},
    isCompleteDate:{type:String,default:null},
    geometry: GeoSchema
});



const Orders = mongoose.model("Order", OrdersSchema);
module.exports = Orders;