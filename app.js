const express=require("express")
const morgan=require("morgan")
const fs=require("fs")

const app=express()

// GLOBAL MIDDLEWARE
app.use(express.json())
app.use(morgan("dev"))


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

// FOR READING JSON FILE MUST WRAP IT IN JSON.PARSE
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get("/api/v1/tours",(req,res)=>{
    res.status(200).json({
        status:"success",
        requestedAt:req.requestTime,
        results:tours.length,
        data:{
            tours
        }
    })
})

app.post("/api/v1/tours",(req,res)=>{
  const newId=tours[tours.length-1].id+1;
  const newTour=Object.assign({id:newId},req.body)

  tours.push(newTour)

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
    res.status(201).json({
        status:"success",
        data:{
            tour:newTour
        }
    })
  })

})

app.get("/api/v1/tours/:id",(req,res)=>{
    console.log(req.params)
    const id=req.params.id*1;

    // if(id>tours.length){
    //     return res.status(404).json({
    //         status:"fail",
    //         message:"Inavalid Id"
    //     })
    // }
    const tour=tours.find(el=>el.id===id)

    if(!tour){
        return res.status(404).json({
            status:"fail",
            message:"Inavalid Id"
        })
    }

    res.status(200).json({
        status:"success",
        data:{
            tour
        }
    })
})

app.patch("/api/v1/tours/:id",(req,res)=>{
    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:"fail",
            message:"Inavalid Id"
        })
    }
    res.status(200).json({
        status:"success",
        message:"<updated tour here...>"
    })
})


app.delete("/api/v1/tours/:id",(req,res)=>{

    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:"fail",
            message:"Inavalid Id"
        })
    }
    // STATUS 204 NO CONTENT
    res.status(204).json({
        status:"success",
        data:null
    })
})

// SERVER CREATION
const PORT=5000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}...`)
})