const express=require("express")
const {createTour,getAllTours,getTour,updateTour,deleteTour,aliasTour}=require("../controller/tourController")
const authController=require("../controller/authController");

const router=express.Router()

// PARAM MIDDLEWARE
// router.param('id',checkID);

router.route("/top-5-cheap").get(aliasTour,getAllTours)

router.route("/")
.get(authController.authCheckMiddleware,getAllTours)
// .post(checkBody,createTour)
.post(createTour)

router.route("/:id")
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

module.exports=router;