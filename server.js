const app=require("./app")


// SERVER CREATION
const PORT=5000
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}...`)
})