const fs=require("fs")
const Tour=require("../../model/toursSchema")
const dotenv=require("dotenv")
dotenv.config({path:"./config.env"})
const connectDb=require("../../config/db")

// database connection
connectDb();

// READING JSON FILE
const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,"utf-8"))


// INSERT DATA INTO DB
const importData=async()=>{
try {
    await Tour.create(tours)
    console.log("Data Sucessfully loaded!")
    
} catch (error) {
    console.log(error)
}

}

// DELETE DATA FROM DATABASE
const deleteData=async()=>{
    try {
        await Tour.deleteMany();
        console.log("Data Deleted Suncessfully!")
    } catch (error) {
        console.log(error);
    }
}

if(process.argv[2]==='--import'){
    importData();
}
else if(process.argv[2]==='--delete'){
    deleteData();
}
// console.log(process.argv)