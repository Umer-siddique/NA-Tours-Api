const express=require("express")
const {createTour,getAllTours,getTour,updateTour,deleteTour,checkID, checkBody}=require("../controller/tourController")

const router=express.Router()

// PARAM MIDDLEWARE
router.param('id',checkID);

router.route("/")
.get(getAllTours)
.post(checkBody,createTour)

router.route("/:id")
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

module.exports=router;