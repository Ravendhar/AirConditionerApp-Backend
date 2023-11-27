const router=require("express").Router();
const {addCategory,deleteCategory,updateCategory,showAllCategory,getParticularCategory}=require("../Controller/CategoryController")
const {verifyToken, isAdmin}=require("../middleware/AuthMiddleWare")
const {setCorsHeaders} =require("../middleware/CorsMiddleWare")

router.get("/",setCorsHeaders,verifyToken,isAdmin,showAllCategory)

router.get("/:id",setCorsHeaders,verifyToken,isAdmin,getParticularCategory)


router.post("/addCategory",setCorsHeaders,verifyToken,isAdmin,addCategory)


router.put("/updateCategory/:id",setCorsHeaders,verifyToken,isAdmin,updateCategory)


router.delete("/deleteCategory/:id",setCorsHeaders,verifyToken,isAdmin,deleteCategory)

module.exports=router