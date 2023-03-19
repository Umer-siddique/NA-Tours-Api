const mongoose =require("mongoose")
mongoose.set('strictQuery', false);

const MONGO_URI=process.env.NODE_ENV==="development"? process.env.LOCAL_MONGO_URI:process.env.MONGO_URI;

const connectDb=async()=>{
    try {
       const conn= await mongoose.connect(MONGO_URI)
       console.log(`Connected to Database ${conn.connections[0].host}`);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports=connectDb;