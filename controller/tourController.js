const fs=require("fs")
 
 
 // FOR READING JSON FILE MUST WRAP IT IN JSON.PARSE
 const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

//   CONTROLLER CHECKING FOR INVALID ID
const checkID=(req,res,next,val)=>{
   console.log(`Id is ${val}`);

   if(req.params.id*1>tours.length){
    return res.status(404).json({
        status:"fail",
        message:"Inavalid Id"
    })
}
next()

}

const checkBody=(req,res,next)=>{
   console.log(req.body)
   if(!req.body.name||!req.body.price){
    return res.status(400).json({
        status:"fail",
        message:"Missing value price or name"
    })
   }
}
  
const createTour = (req,res)=>{
    const newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id:newId},req.body)
  
    tours.push(newTour)
  
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
      res.status(201).json({
          status:"success",
          data:{
              tour:newTour
          }
      })
    })
  
  };

const getAllTours = (req, res) => {
 
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req,res)=>{
    console.log(req.params)
    // const id=req.params.id*1;

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
};

const updateTour = (req,res)=>{
    // if(req.params.id*1>tours.length){
    //     return res.status(404).json({
    //         status:"fail",
    //         message:"Inavalid Id"
    //     })
    // }
    res.status(200).json({
        status:"success",
        message:"<updated tour here...>"
    })
};

const deleteTour = (req,res)=>{

    // if(req.params.id*1>tours.length){
    //     return res.status(404).json({
    //         status:"fail",
    //         message:"Inavalid Id"
    //     })
    // }
    // STATUS 204 NO CONTENT
    res.status(204).json({
        status:"success",
        data:null
    })
};

module.exports = { createTour, getAllTours, getTour, updateTour, deleteTour,checkID,checkBody };
