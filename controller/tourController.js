const Tour=require("../model/toursSchema")

// const fs=require("fs")
 
 
 // FOR READING JSON FILE MUST WRAP IT IN JSON.PARSE
//  const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
//   );

//   CONTROLLER CHECKING FOR INVALID ID
// const checkID=(req,res,next,val)=>{
//    console.log(`Id is ${val}`);

//    if(req.params.id*1>tours.length){
//     return res.status(404).json({
//         status:"fail",
//         message:"Inavalid Id"
//     })
// }
// next()

// }

// const checkBody=(req,res,next)=>{
//    console.log(req.body)
//    if(!req.body.name||!req.body.price){
//     return res.status(400).json({
//         status:"fail",
//         message:"Missing value price or name"
//     })
//    }
//    next()
// }
  
const createTour = async(req,res)=>{
    // const newId=tours[tours.length-1].id+1;
    // const newTour=Object.assign({id:newId},req.body)
  
    // tours.push(newTour)
  
    // fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
    //   res.status(201).json({
    //       status:"success",
    //       data:{
    //           tour:newTour
    //       }
    //   })
    // })

    try {
        
        const tour=await Tour.create(req.body);
    
        res.status(201).json({
            status:"success",
            data:{
                tour
            }
        })
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err
        })
    }

  
  };

const getAllTours = async(req, res) => {
    try {
        //  BUILD QUERY
        // 1) FILTERING
        const queryObj={...req.query};
        const excludedFields=['page','limit','sort','fields'];
        excludedFields.forEach(el=> delete queryObj[el]);


        //2) ADVANCE FILTERING
        let queryStr=JSON.stringify(queryObj)
        queryStr=JSON.parse(queryStr.replace(/\b(lt|lte|gt|gte)\b/g, match=>`$${match}`))
        // console.log(queryStr)

        
        // EXECUTE QUERY
        let query=Tour.find(queryStr)

        // SORT QUERY
        if(req.query.sort){
            const sortBy=req.query.sort.split(',').join(' ');
            console.log(sortBy)
            query=query.sort(sortBy);
        }else{
            query=query.sort('-createdAt')
        }

        // LIMITING FIELDS QUERY
        if(req.query.fields){
            const fields=req.query.fields.split(',').join(' ');
            console.log(fields);
            query=query.select(fields);
        }else{
            query=query.select('-__v')
        }

        // PAGINATION QUERY
        const page=req.query.page*1||1;
        const limit=req.query.limit*1||100;

        const skip=(page-1)*limit;

        query=query.skip(skip).limit(limit);

        console.log(req.query)
        const tours=await query;
         
        // SEND RESPOSNSE
        res.status(200).json({
            status: "success",
            // requestedAt: req.requestTime,
            results: tours.length,
            data: {
              tours,
            },
          });
        
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
 
 
};

const getTour = async(req,res)=>{
    console.log(req.params)
    // const id=req.params.id*1;

    // if(id>tours.length){
    //     return res.status(404).json({
    //         status:"fail",
    //         message:"Inavalid Id"
    //     })
    // }
    // const tour=tours.find(el=>el.id===id)

    
    try {
        const tour=await Tour.findById(req.params.id)
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
        
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err
        })
    }


};

const updateTour = async(req,res)=>{
    // if(req.params.id*1>tours.length){
    //     return res.status(404).json({
    //         status:"fail",
    //         message:"Inavalid Id"
    //     })
    // }

    try {
        const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })

        res.status(200).json({
            status:"success",
            data:{
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
    
};

const deleteTour = async(req,res)=>{

    // if(req.params.id*1>tours.length){
    //     return res.status(404).json({
    //         status:"fail",
    //         message:"Inavalid Id"
    //     })
    // }

    try {
        await Tour.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status:"success",
            data:null
        })
    } catch (err) {
        res.status(404).json({
            status:"fail",
            message:err
        })
    }

    // STATUS 204 NO CONTENT
    res.status(204).json({
        status:"success",
        data:null
    })
};

module.exports = { createTour, getAllTours, getTour, updateTour, deleteTour};
