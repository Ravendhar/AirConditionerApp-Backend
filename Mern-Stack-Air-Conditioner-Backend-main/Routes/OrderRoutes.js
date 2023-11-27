const router=require("express").Router()
const {getAllOrders,getParticularOrder,getParticularUserOrder,placeOrder,updateOrderStatus,cancelOrder,deleteOrder}=require("../Controller/OrderController")
const {verifyToken, isAdmin}=require("../middleware/AuthMiddleWare")
const {setCorsHeaders} =require("../middleware/CorsMiddleWare")


// to get all Orders
router.get("/allOrders",setCorsHeaders,verifyToken, isAdmin,getAllOrders)


// to get the current user orders
router.get("/",setCorsHeaders,verifyToken,getParticularUserOrder)


//to get particular Order
router.get("/:id",setCorsHeaders,verifyToken,getParticularOrder)





// user can add the order
router.post("/addOrder",setCorsHeaders,verifyToken,placeOrder)


// admin can update the product
router.put("/updateOrderStatus/:id",setCorsHeaders,verifyToken, isAdmin,updateOrderStatus)


//
router.put("/cancelOrder/:id",setCorsHeaders,verifyToken,cancelOrder)

// admin can delete the product
router.delete("/deleteOrder/:id",setCorsHeaders,verifyToken, isAdmin,deleteOrder)



module.exports=router