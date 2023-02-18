const express=require("express")
const morgan=require("morgan")
const env=require("dotenv")
const tourRoutes=require("./routes/tourRoutes")

const app=express()

env.config({path:"./config.env"})
// GLOBAL MIDDLEWARE
app.use(express.json())
if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"))
}


// CUSTOM MIDDLEWARE
app.use((req,res,next)=>{
  console.log("Hello from the middleware!");
  next()
})

app.use((req,res,next)=>{
  req.requestTime=new Date().toISOString()
  next()
})

// LISTENING FIRST REQUEST
// app.get("/",(req,res)=>{
//     res.status(200).json({
//         message:"Hello from server side!",
//         app:"Natours Api"
//     })
// })

// app.post("/",(req,res)=>{
//   res.status(200).send("You can post to this end point")
// })

// ******ROUTES*****
app.use("/api/v1/tours",tourRoutes)



module.exports=app;