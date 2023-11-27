const router=require("express").Router();
const {login,register,getAllUsers,updateProfile,deleteParticularUser,updatePassword,getUser,logout} =require( "../Controller/UserContoller");
const {verifyToken, isAdmin}=require("../middleware/AuthMiddleWare")

const {setCorsHeaders} =require("../middleware/CorsMiddleWare")




// to get current user profile data of user
router.get("/",setCorsHeaders,verifyToken,getUser);   // -> /user  


// get all users
router.get("/allUsers",setCorsHeaders,verifyToken,isAdmin,getAllUsers)    // -> user/allUsers



// adding new user
router.post("/register",setCorsHeaders,register)   // -> user/register

// authentication
router.post("/login",setCorsHeaders,login)     // -> /user/login

//log out
router.post("/logout",setCorsHeaders,logout)   // -> user/logout


router.put("/updatePassword",setCorsHeaders,verifyToken,updatePassword)  // updating the current user password  ->  /user/updatePassword


// update user  we can update the phone number and the name

router.put("/updateprofile/:id",setCorsHeaders,updateProfile)      // -> user/updateprofile


// deleting the user
router.delete("/deleteUser/:id",setCorsHeaders,verifyToken,isAdmin,deleteParticularUser)     // -> to delete the particular user








module.exports=router