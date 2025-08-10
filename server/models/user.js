import mongoose from 'mongoose';

const userSchema=new  mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
     },
     name:{
        type:String,
        required:true
     },
    role: {
        type: String,
        enum: ['customer','admin'], 
        default: 'customer', 
     },
    
    verificationToken:String,
     


},{timestamps:true});

export const User=mongoose.model('users',userSchema)
 