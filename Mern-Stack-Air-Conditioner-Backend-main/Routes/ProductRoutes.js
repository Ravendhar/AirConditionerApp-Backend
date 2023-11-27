const router=require("express").Router()
const {getAllProducts,getParticularProduct,addProduct,deleteProduct,updateProduct,addReview,getFeaturedProduct,addMultipleProducts}=require("../Controller/ProductContoller")
const {verifyToken, isAdmin}=require("../middleware/AuthMiddleWare")
const {setCorsHeaders} =require("../middleware/CorsMiddleWare")

// to get all products
router.get("/",getAllProducts)


//to get particular product
router.get("/:id",getParticularProduct)


//top 3 products

router.get("/get/isFeatured",getFeaturedProduct)


// admin can add the product
router.post("/addProduct",setCorsHeaders,verifyToken, isAdmin,addProduct)


router.post("/addMultipleProducts",setCorsHeaders,verifyToken,isAdmin,addMultipleProducts)


// admin can update the product
router.put("/updateProduct/:id",setCorsHeaders,verifyToken, isAdmin,updateProduct)



router.put("/addReview/:id",setCorsHeaders,verifyToken,addReview)


// admin can delete the product
router.delete("/deleteProduct/:id",setCorsHeaders,verifyToken, isAdmin,deleteProduct)






module.exports=router