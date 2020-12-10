const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    dob:{type:String,required:true},
    gender:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    type:{type:String,required:true},
    password:{type:String,required:true},
    profileImg:{type:String, default:null}
});

UsersSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password = hashedPassword;
    next();
});

const Users = mongoose.model("User", UsersSchema);
module.exports = Users;