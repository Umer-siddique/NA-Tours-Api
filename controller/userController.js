const User=require("../model/userSchema");

exports.createUser=async(req,res)=>{
  res.status(201).json({
    status:"success",
    message:"Successfully created user."
    // data:{
    //    newUser 
    // }
  })
}

exports.getAllUser=async(req,res)=>{
    res.status(201).json({
        status:"success",
        message:"All Users."
        // data:{
        //    newUser 
        // }
      })
}

exports.getUser=async(req,res)=>{
    res.status(201).json({
        status:"success",
        message:"Single user."
        // data:{
        //    newUser 
        // }
      })
}

exports.updateUser=async(req,res)=>{
    res.status(201).json({
        status:"success",
        message:"updated user."
        // data:{
        //    newUser 
        // }
      })
}

exports.deleteUser=async(req,res)=>{
    res.status(201).json({
        status:"success",
        message:"Deleted user."
        // data:{
        //    newUser 
        // }
      })
}