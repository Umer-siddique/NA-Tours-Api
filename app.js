const express=require("express")
const morgan=require("morgan")
const cors=require("cors")
const tourRoutes=require("./routes/tourRoutes")
const userRoutes=require("./routes/userRoutes")

const app=express()

// GLOBAL MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin:"*",
  methods:"GET,POST,PUT,PATCH,DELETE",
  credentials:true
}))
//FOR SERVING STATIC FILES
// app.use(express.static("example_path:__dirname/public")) 

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
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Hello from server side!",
        app:"Natours Api"
    })
})

// app.post("/",(req,res)=>{
//   res.status(200).send("You can post to this end point")
// })

// ******ROUTES*****
app.use("/api/v1/tours",tourRoutes)
app.use("/api/v1/users",userRoutes)



module.exports=app;