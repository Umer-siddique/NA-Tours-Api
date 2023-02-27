const mongoose=require("mongoose")

const toursSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A tour must have a name"],
        unique:true,
        trim:true
    },
    price:{
        type:Number,
        required:[true,"A tour must have a price"],
    },
    priceDiscount:{
        type:Number
    },
    duration:{
        type:Number,
        required:[true,"A tour must have a duration"],
    },
    difficulty:{
        type:String,
        required:[true,"A tour must have a difficulty"]
    },
    ratingsAverage:{
        type:Number,
        default:4.5
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    maxGroupSize:{
        type:Number,
        required:[true,"A tour must have a group size"]
    },
    summary:{
        type:String,
        required:[true,"A tour must have a description"]
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
        type:String,
        required:[true,"A tour must have an image."]
    },
    images:{
        type:[String]
    },
    startDates:{
        type:[Date]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("Tour",toursSchema)