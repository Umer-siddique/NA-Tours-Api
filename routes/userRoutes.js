const express=require("express");
const userController=require("../controller/userController");
const authController=require("../controller/authController");

const router=express.Router();

// SIGNUP
router.route("/signup").post(authController.signupUser)

// LOGIN
router.route("/login").post(authController.loginUser)

// USER ACCESS ROUTES
router.route("/")
.post(userController.createUser)
.get(userController.getAllUser);

router.route("/:id")
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports=router;