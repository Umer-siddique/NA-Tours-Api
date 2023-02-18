const express=require("express")

const app=express()

// LISTENING FIRST REQUEST
app.get("/",(req,res)=>{
    res.status(200).send("Hello from server side!")
})


// SERVER CREATION
const PORT=5000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}...`)
})