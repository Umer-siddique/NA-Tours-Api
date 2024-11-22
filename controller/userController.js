const User = require("../model/userSchema");


const filterObj=(obj,...allowedFields)=>{
    let newObj={};
  Object.keys(obj).forEach(el=>{
    if(allowedFields.includes(el)){
      newObj[el]=obj[el];
    }
  })
  return newObj;
}

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if(!user){
      throw Error("Invalid id!");
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateMe=async(req,res)=>{
   try {

    const filteredBody=filterObj(req.body,'name','email','photo');

    const updatedUser=await User.findByIdAndUpdate(req.user._id,filteredBody,{
      new:true,
      runValidators:true
    })

    res.status(201).json({
      status:"success",
      data:{
        user:updatedUser
      }
    })

   } catch (error) {
     res.status(400).json({
      status:"fail",
      error
     })
   }
}

exports.updateUser = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  res.status(201).json({
    status: "success",
    message: "Deleted user.",
    // data:{
    //    newUser
    // }
  });
};
