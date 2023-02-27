const express=require("express")
const {createTour,getAllTours,getTour,updateTour,deleteTour}=require("../controller/tourController")

const router=express.Router()

// PARAM MIDDLEWARE
// router.param('id',checkID);

router.route("/")
.get(getAllTours)
// .post(checkBody,createTour)
.post(createTour)

router.route("/:id")
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

module.exports=router;