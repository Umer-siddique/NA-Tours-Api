const dotenv=require("dotenv")
dotenv.config({path:"./config.env"})
const connectDb=require("./config/db")

const app=require("./app")




// DATABASE CONNECTION
connectDb()

// SERVER CREATION
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}...`)
})