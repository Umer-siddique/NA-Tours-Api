const express=require("express");
const userController=require("../controller/userController");
const authController=require("../controller/authController");

const router=express.Router();

// SIGNUP
router.route("/signup").post(authController.signupUser)

// LOGIN
router.route("/login").post(authController.loginUser)

router.route("/forgotpassword").post(authController.forgotPassword)
router.route("/resetpassword/:token").patch(authController.resetPassword)

// USER DATA ROUTES
router.route("/")
.get(userController.getAllUser);

router.route("/updateMe").patch(userController.updateMe);

router.route("/:id")
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports=router;