const router = require('express').Router();
const {
  getParticularUserCart,
  AddToCart,
  deleteCartItem,
  deleteAllCartItemsForUser,updateCart,checkCartItem
} = require('../Controller/CartController');
const { verifyToken } = require('../middleware/AuthMiddleWare');

const {setCorsHeaders} =require("../middleware/CorsMiddleWare")

// Get particular user's cart
router.get('/',setCorsHeaders, verifyToken, getParticularUserCart);

// Add item to cart
router.post('/addToCart', setCorsHeaders,verifyToken, AddToCart);

// Delete a single cart item
router.delete('/deleteCartItem/:id',setCorsHeaders, verifyToken, deleteCartItem);

// Delete all cart items for a user
router.delete('/deleteAllCartItems', setCorsHeaders,verifyToken, deleteAllCartItemsForUser);


router.put("/updateCartItem/:id",setCorsHeaders,verifyToken,updateCart)


router.get("/checkCartItem/:productId",setCorsHeaders,verifyToken,checkCartItem)

module.exports = router;
